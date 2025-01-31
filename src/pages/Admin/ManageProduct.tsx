import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Modal, Space, Table, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import { IoTrashBinSharp } from "react-icons/io5";
import { toast } from 'sonner';
import ServiceHeader from '../../components/ServiceHeader';
import CustomButton from '../../components/buttons/CustomButton';
import CustomButtonSM from '../../components/buttons/CustomButtonSM';
import BSInput from '../../components/form/BSInput';
import { useAddProductMutation, useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from '../../redux/features/products/products.api';
import { handleImageUpload } from '../../utils/imageUrlGenerator';

// Define product type
interface Product {
    _id: string;
    title: string;
    author: string;
    price: number;
    inStock: boolean;
    category: string;
    description: string;
    imageUrl: string
}
// console.log("key", );
const ManageProduct = () => {
    const { data: allProductData, isLoading } = useGetAllProductsQuery(undefined);
    const [products, setProducts] = useState<Product[]>([]);

    // Mutations
    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    useEffect(() => {
        if (allProductData?.data) {
            setProducts(allProductData.data); // Set products from API response
        }
    }, [allProductData]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const toastId = 'manageOrders'

    // Handle form submit for adding/updating a product
    const handleFormSubmit = async (values: Omit<Product, "_id">) => {
        try {
            toast.loading("Uploading image...");

            let imageUrl = editingProduct?.imageUrl || ""; // Keep existing image if not changed

            // Upload new image if a file is selected
            if (fileList.length > 0) {
                imageUrl = await handleImageUpload(fileList[0].originFileObj as RcFile);
                if (!imageUrl) throw new Error("Image upload failed");
            }



            const productData: Omit<Product, "_id"> = {
                ...values,
                imageUrl: imageUrl, // Save image URL
                description: values.description || "",
                inStock: values.inStock || false,
            };

            if (editingProduct) {
                // Update existing product
                await updateProduct({ id: editingProduct._id, data: productData }).unwrap();
                setProducts((prevProducts) =>
                    prevProducts.map((prod) =>
                        prod._id === editingProduct._id ? { ...prod, ...productData } : prod
                    )
                );
                toast.success("Product updated successfully!", { id: toastId });
            } else {
                // Add a new product
                const newProduct = await addProduct(productData).unwrap();
                setProducts((prevProducts) => [newProduct, ...prevProducts]);
                toast.success("Product added successfully!", { id: toastId });
            }

            setIsModalVisible(false);
            setEditingProduct(null);
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product.", { id: toastId });
        }
    };
    const handleFileChange: UploadProps["onChange"] = ({ fileList }) => {
        setFileList(fileList);
    };

    // Handle Edit button click
    const handleEdit = (record: Product) => {
        setEditingProduct(record);
        setIsModalVisible(true);
    };

    // Handle Delete button click
    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    // Call the delete mutation
                    await deleteProduct(id).unwrap();
                    // Update the state by removing the deleted product
                    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
                    // Show success message
                    toast.success("Product deleted successfully!", { id: toastId });
                } catch (error) {
                    console.error("Error deleting product:", error);
                    toast.error("Failed to delete product.", { id: toastId });
                }
            },
        });
    };

    // Handle Add New Product button click
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalVisible(true);
    };


    // Table columns
    const columns = [
        { title: "Title", dataIndex: "title", key: "title" },
        { title: "Author", dataIndex: "author", key: "author" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Stock",
            dataIndex: "inStock",
            key: "inStock",
            render: (inStock: boolean) => <Checkbox checked={inStock} disabled />,
        },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Product) => (
                <Space>
                    <CustomButtonSM text="Edit" onClick={() => handleEdit(record)} />
                    <IoTrashBinSharp className="text-red-500 cursor-pointer" size={20} onClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
    ]

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <ServiceHeader title="Manage Products" text="Discover more about this book and make it yours today." />
            <div className='w-full md:w-[12rem] mb-8'>


                <CustomButton text={'Add New Product'} onClick={handleAddNew} />
            </div>


            <Table
                columns={columns}
                dataSource={products}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                bordered
            />

            {/* Modal for Add/Edit Product */}
            <Modal
                title={editingProduct ? 'Edit Product' : 'Add New Product'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={editingProduct || {
                        title: '',
                        author: '',
                        price: 0,
                        category: '',
                        description: '',
                        quantity: 0,
                        inStock: false,
                    }}
                    key={editingProduct?._id} // Ensure re-render when editingProduct changes
                >
                    <BSInput type="text" name="title" label="Title" placeholder="Enter product title" rules={[{ required: true, message: 'Please enter the product title' }]} />
                    <BSInput type="text" name="author" label="Author" placeholder="Enter author name" rules={[{ required: true, message: 'Please enter the author' }]} />
                    <BSInput type="number" name="price" label="Price" min={0} placeholder="Enter price" rules={[{ required: true, message: 'Please enter the price' }]} />
                    <BSInput type="text" name="category" label="Category" placeholder="Enter category" rules={[{ required: true, message: 'Please enter the category' }]} />
                    <BSInput type="text" name="description" label="Description" placeholder="Enter description" rules={[{ required: true, message: 'Please enter the description' }]} />
                    <BSInput type="number" name="quantity" label="Quantity" min={0} placeholder="Enter quantity" rules={[{ required: true, message: 'Please enter the quantity' }]} />
                    <Form.Item name="inStock" valuePropName="checked" label="In Stock">
                        <Checkbox />
                    </Form.Item>
                    <Form.Item name="image" label="Product Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                        <Upload
                            beforeUpload={() => false} // Prevent auto-upload
                            listType="picture"
                            fileList={fileList}
                            onChange={handleFileChange} // Handle file selection
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <div className='max-w-[20rem] mx-auto'>

                            <CustomButton type="primary" htmlType="submit" block text={editingProduct ? 'Update Product' : 'Add Product'} />
                        </div>


                    </Form.Item>
                </Form>


            </Modal>
        </div>
    );
};

export default ManageProduct;

import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Modal, Row, Select, Skeleton, Space, Table, Upload, UploadFile, UploadProps } from 'antd';
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
import BookStoreFooter from '../Footer';

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
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (allProductData?.data) {
            setProducts([...allProductData.data]?.reverse()); // Set products from API response
        }
    }, [allProductData]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const toastId = 'manageOrders'

    // Handle form submit for adding/updating a product
    const handleFormSubmit = async (values: Omit<Product, "_id">) => {
        try {
            toast.loading("Uploading image...", { id: toastId });

            let imageUrl = editingProduct?.imageUrl || ""; // Keep existing image if not changed

            // Upload new image if a file is selected
            if (fileList.length > 0) {
                imageUrl = await handleImageUpload(fileList[0].originFileObj as RcFile) as string;
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
            dataIndex: "quantity",
            key: "quantity",

        },
        { title: "Category", dataIndex: "category", key: "category" },
        {
            title: "Actions",
            key: "actions",
            render: (record: Product) => (
                <Space>
                    <CustomButtonSM text="Edit" onClick={() => handleEdit(record)} />
                    <IoTrashBinSharp className="text-red-500 cursor-pointer" size={20} onClick={() => handleDelete(record._id)} />
                </Space>
            ),
        },
    ]
    const categories = ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'];

    if (isLoading) {
        return (
            <div style={{ padding: '20px' }}>
                <ServiceHeader title="Manage Users" text="Discover more about this book and make it yours today." />
                <Skeleton active paragraph={{ rows: 5 }} />
            </div>
        );
    }

    return (
        <div className="bg-white">
    <div className='bg-background m-3 md:m-5 rounded-lg' >
                <ServiceHeader title="Manage Products" text="Discover more about this book and make it yours today." />
                <div className='w-full md:w-[12rem] mb-8'>
                    <CustomButton text={'Add New Product'} onClick={handleAddNew} />
                </div>
                <Table
                    className='min-h-[60vh]'
                    columns={columns}
                    dataSource={products}
                    rowKey="_id"
                    pagination={{ pageSize: 8 }}
                    bordered
                    scroll={{ x: true }}
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
                        key={editingProduct?._id}
                    >
                        <Row gutter={[24, 0]}>
                            {/* Left Column */}
                            <Col xs={24} md={12}>
                                <BSInput type="text" name="title" label="Title" placeholder="Enter product title" rules={[{ required: true, message: 'Please enter the product title' }]} />
                            </Col>
                            <Col xs={24} md={12}>
                                <BSInput type="text" name="author" label="Author" placeholder="Enter author name" rules={[{ required: true, message: 'Please enter the author' }]} />
                            </Col>

                            <Col xs={24} md={12}>
                                <BSInput type="number" name="price" label="Price" min={0} placeholder="Enter price" rules={[{ required: true, message: 'Please enter the price' }]} />
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
                                    <Select placeholder="Select category" className="w-full h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none">
                                        {categories.map((cat) => (
                                            <Select.Option key={cat} value={cat}>
                                                {cat}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <BSInput type="textarea" name="description" label="Description" placeholder="Enter description" rules={[{ required: true, message: 'Please enter the description' }]} />
                            </Col>
                            <Col xs={24} md={12}>
                                <BSInput type="number" name="quantity" label="Quantity" min={0} placeholder="Enter quantity" rules={[{ required: true, message: 'Please enter the quantity' }]} />
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item name="inStock" valuePropName="checked">
                                    <Checkbox>In Stock</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>

                                <Form.Item name="image" label="" className='' valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>


                                    <Upload
                                        beforeUpload={() => false}

                                        listType="picture"
                                        fileList={fileList}
                                        onChange={handleFileChange}
                                    >
                                        <Button className='h-12' icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>

                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item>
                            <div className="max-w-[20rem] mx-auto">
                                <CustomButton disabled={isAdding || isUpdating} type="primary" htmlType="submit" block text={editingProduct ? 'Update Product' : 'Add Product'} />
                            </div>
                        </Form.Item>
                    </Form>


                </Modal>
            </div>
            <BookStoreFooter />
        </div>
    );
};

export default ManageProduct;

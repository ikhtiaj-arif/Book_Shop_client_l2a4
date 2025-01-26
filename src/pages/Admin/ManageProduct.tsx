import { useEffect, useState } from 'react';

import { Button, Form, Input, InputNumber, Modal, Space, Table } from 'antd';
import { useAddProductMutation, useGetAllProductsQuery } from '../../redux/features/products/products.api';

const ManageProduct = () => {
    const { data: allProductData, isLoading } = useGetAllProductsQuery(undefined);
    const [products, setProducts] = useState([]);
    const [createProduct] = useAddProductMutation()

    useEffect(() => {
        if (allProductData?.data) {
            setProducts(allProductData.data); // Set products from API response
        }
    }, [allProductData]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Handle form submit for adding/updating a product
    const handleFormSubmit = async (values) => {
        const productData = {
            ...values,
            description: values.description || '', // Add description field
            inStock: values.inStock || false, // Handle checkbox boolean
        };
        console.log(productData);
        try {
            const response = await createProduct(productData)




            const newProduct = await response.json();

            setProducts((prevProducts) => [newProduct, ...prevProducts]); // Add the new product to the list
            setIsModalVisible(false); // Close the modal
            setEditingProduct(null); // Reset editing state

        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    // Handle Edit button click
    const handleEdit = (record) => {
        setEditingProduct(record);
        setIsModalVisible(true);
    };

    // Handle Delete button click
    const handleDelete = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    };

    // Handle Add New Product button click
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalVisible(true);
    };


    // Table columns
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'In Stock',
            dataIndex: 'inStock',
            key: 'inStock',
            render: (text) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="danger" size="small" onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Manage Products</h1>
            <Button type="primary" style={{ marginBottom: '20px' }} onClick={handleAddNew}>
                Add New Product
            </Button>
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
                    initialValues={
                        editingProduct || {
                            title: '',
                            author: '',
                            price: 0,
                            category: '',
                            description: '',
                            quantity: 0,
                            inStock: false,
                        }
                    }
                >
                    <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the product title' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please enter the author' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please enter the category' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: 'Please enter the quantity' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="inStock" valuePropName="checked" label="In Stock">
                        <Input type="checkbox" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingProduct ? 'Update Product' : 'Add Product'}
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
};

export default ManageProduct;

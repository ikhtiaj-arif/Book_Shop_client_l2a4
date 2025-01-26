import { Table, Button, Space } from 'antd';
import { useGetOrdersQuery } from '../../redux/features/orders/order.api';

const ManageOrders = () => {
  const { data: orderData, isLoading } = useGetOrdersQuery(undefined);

  if (isLoading) {
    return <>Loading...</>;
  }

  // Define table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <span style={{ wordBreak: 'break-word' }}>{text}</span>, // Wrap long text
    },
    {
      title: 'Customer Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Product ID',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text}`, // Format price
    },
    {
      title: 'Order Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleView(record)}>
            View
          </Button>
          <Button type="default" size="small" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="text" size="small" onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Event handlers for actions
  const handleView = (record) => {
    alert(`Viewing order: ${record._id}`);
  };

  const handleEdit = (record) => {
    alert(`Editing order: ${record._id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting order: ${id}`);
    // Add logic to delete the order from backend here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Orders</h1>
      <Table
        columns={columns}
        dataSource={orderData?.data}
        rowKey="_id" // Use the `_id` field as the unique key for rows
        pagination={{
          pageSize: 5, // Set number of rows per page
        }}
        bordered
      />
    </div>
  );
};

export default ManageOrders;

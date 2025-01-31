import { Skeleton, Table } from 'antd';
import React from 'react';
import ServiceHeader from '../../components/ServiceHeader';
import { useGetOrdersQuery } from '../../redux/features/orders/order.api';

// Define types for the order data
interface Product {
  product: string;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  transaction: {
    id: string;
    transactionStatus: string;
  };
}

const ManageOrders: React.FC = () => {
  const { data: orderData, isLoading } = useGetOrdersQuery(undefined);
  // const{data:allProducts} = useGetAllProductsQuery()

  if (isLoading) {
    return <>Loading...</>;
  }

  // Define table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => <span style={{ wordBreak: 'break-word' }}>{text}</span>,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Products',
      key: 'products',
      render: (record: Order) => (
        <ul>
          {record.products.map((product) => (
            <li key={product._id}>{`Product: ${product.product}, Quantity: ${product.quantity}`}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: number) => `$${text.toFixed(2)}`, // Format price
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(), // Format date
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record: Order) => (
    //     <Space>
    //       <CustomButtonSM text="Edit" onClick={() => handleEdit(record)} />
    //       <IoTrashBinSharp
    //         className="text-red-500 cursor-pointer"
    //         size={20}
    //         onClick={() => handleDelete(record._id)}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  // Event handlers for actions
  // const handleEdit = (record: Order) => {
  //   alert(`Editing order: ${record._id}`);
  //   // Add logic to edit the order here
  // };

  // const handleDelete = (id: string) => {
  //   Modal.confirm({
  //     title: 'Are you sure you want to delete this order?',
  //     onOk: () => {
  //       // Add logic to delete the order from backend here
  //       message.success('Order deleted successfully');
  //     },
  //   });
  // };
  if (isLoading) {
    return (
        <div style={{ padding: '20px' }}>
            <ServiceHeader title="Manage Users" text="Discover more about this book and make it yours today." />
            <Skeleton active paragraph={{ rows: 5 }} />
        </div>
    );
}


  return (
    <div style={{ padding: '20px' }}>
      <ServiceHeader title="Order History" text="Discover more about this book and make it yours today." />
      <Table
        columns={columns}
        dataSource={orderData?.data} // Ensure this is the correct property that contains the orders
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

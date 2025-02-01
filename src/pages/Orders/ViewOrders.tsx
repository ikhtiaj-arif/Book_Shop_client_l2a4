import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import ServiceHeader from '../../components/ServiceHeader';
import { useViewOrdersQuery } from '../../redux/features/orders/order.api';
import BookStoreFooter from '../Footer';

const ViewOrders = () => {
    const { id } = useParams()
    const { data: orderData } = useViewOrdersQuery(id)
    const orders = orderData?.data


    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: ['transaction', 'id'],
            key: '_id',
            render: (text?: string) => <span style={{ wordBreak: 'break-word' }}>{text}</span>, // Wrap long text
        },
        {
            title: 'Amount',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ]

    return (
        <div style={{ padding: '20px', height: 'screen' }}>
            <ServiceHeader title="My Orders" text="Discover more about this book and make it yours today." />
            <Table
                className='min-h-[60vh]'
                columns={columns}
                dataSource={orders}
                rowKey="_id" // Use the `_id` field as the unique key for rows
                pagination={{
                    pageSize: 8, // Set number of rows per page
                }}
                bordered
                scroll={{ x: true }}
            />

            <BookStoreFooter />
        </div>
    );
};

export default ViewOrders;
import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useViewOrdersQuery } from '../../redux/features/orders/order.api';
import ServiceHeader from '../../components/ServiceHeader';

const ViewOrders = () => {
    const { id } = useParams()
    const { data: orderData } = useViewOrdersQuery(id)
    const orders = orderData?.data


    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: ['transaction', 'id'],
            key: '_id',
            render: (text) => <span style={{ wordBreak: 'break-word' }}>{text}</span>, // Wrap long text
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
        <div style={{ padding: '20px' }}>
               <ServiceHeader title="Orders History" text="Discover more about this book and make it yours today." />
            <Table
                columns={columns}
                dataSource={orders}
                rowKey="_id" // Use the `_id` field as the unique key for rows
                pagination={{
                    pageSize: 5, // Set number of rows per page
                }}
                bordered
            />
        </div>
    );
};

export default ViewOrders;
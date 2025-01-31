import { Modal, Space, Table, message } from 'antd';
import React from 'react';
import CustomButtonSM from '../../components/buttons/CustomButtonSM';
import SecondaryBtnSM from '../../components/buttons/SecondaryBtnSm';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../redux/features/user/userApi';
import { useAppSelector } from '../../redux/hooks';
import ServiceHeader from '../../components/ServiceHeader';


const ManageUsers: React.FC = () => {
    const { data, isLoading } = useGetAllUsersQuery(undefined);
    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();
    const user = useAppSelector(currentUser)
    console.log(user);

    const userData = data?.data;

    if (isLoading) {
        return <>Loading...</>;
    }

    // Define table columns
    const columns = [
        {
            title: 'User ID',
            dataIndex: '_id',
            key: '_id',
            render: (text: string) => <span style={{ wordBreak: 'break-word' }}>{text}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            render: (isBlocked: boolean) => (
                <span>{isBlocked ? 'Blocked' : 'Active'}</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record: any) => (
                <Space>
                    {/* Conditionally render Block/Unblock button based on the user's status */}
                    {!record.isBlocked
                        ? (
                            <CustomButtonSM
                                text=' Block'
                                type=''
                                disabled={user?.role === 'admin'}
                                onClick={() => handleBlockUnblock(record._id, false)} // Pass false to block
                            />


                        ) : (
                            <SecondaryBtnSM
                                text="Unblock"
                                type=''
                                onClick={() => handleBlockUnblock(record._id, true)} // Pass true to unblock
                            />

                        )}
                </Space>
            ),
        },
    ];

    // Event handler for block/unblock with confirmation and toast notifications
    const handleBlockUnblock = (id: string, isBlocked: boolean) => {
        Modal.confirm({
            title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
            content: `This will change the user's status to ${isBlocked ? 'active' : 'blocked'}.`,
            onOk: () => {
                const action = isBlocked ? unblockUser : blockUser;
                action({ id })
                    .then(() => {
                        message.success(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully!`); // Toast on success
                    })
                    .catch((err) => {
                        message.error(`Failed to ${isBlocked ? 'unblock' : 'block'} user`); // Toast on error
                    });
            },
            onCancel: () => {
                message.info('Action cancelled');
            },
        });
    };

    return (
        <div style={{ padding: '20px' }}>
               <ServiceHeader title="Manage Users" text="Discover more about this book and make it yours today." />
            <Table
                columns={columns}
                dataSource={userData}
                rowKey="_id" // Use the `_id` field as the unique key for rows
                pagination={{
                    pageSize: 5, // Set number of rows per page
                }}
                bordered
            />
        </div>
    );
};

export default ManageUsers;

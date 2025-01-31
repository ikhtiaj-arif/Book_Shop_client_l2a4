/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { message, Modal, Skeleton, Space, Table } from 'antd';
import React from 'react';
import CustomButtonSM from '../../components/buttons/CustomButtonSM';
import SecondaryBtnSM from '../../components/buttons/SecondaryBtnSm';
import ServiceHeader from '../../components/ServiceHeader';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from '../../redux/features/user/userApi';
import { useAppSelector } from '../../redux/hooks';

// Define a TypeScript interface for User
interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
}

const ManageUsers: React.FC = () => {
    const { data, isLoading } = useGetAllUsersQuery(undefined);
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
    const user = useAppSelector(currentUser);

    const userData: User[] = data?.data || [];

    // Skeleton loader while fetching data
    if (isLoading) {
        return (
            <div style={{ padding: '20px' }}>
                <ServiceHeader title="Manage Users" text="Discover more about this book and make it yours today." />
                <Skeleton active paragraph={{ rows: 5 }} />
            </div>
        );
    }

    // Event handler for block/unblock users
    const handleBlockUnblock = async (id: string, isBlocked: boolean) => {
        Modal.confirm({
            title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
            content: `This will change the user's status to ${isBlocked ? 'active' : 'blocked'}.`,
            onOk: async () => {
                try {
                    if (isBlocked) {
                        await unblockUser({ id }).unwrap();
                        message.success('User unblocked successfully!');
                    } else {
                        await blockUser({ id }).unwrap();
                        message.success('User blocked successfully!');
                    }
                } catch (error) {
                    message.error(`Failed to ${isBlocked ? 'unblock' : 'block'} user.`);
                 
                }
            },
        });
    };

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
            render: (isBlocked: boolean) => <span>{isBlocked ? 'Blocked' : 'Active'}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Space>
                    {/* Conditionally render Block/Unblock button based on the user's status */}
                    {!record.isBlocked ? (
                        <CustomButtonSM
                            text="Block"
                            type="default"
                            disabled={user?.role !== 'superadmin' || isBlocking}
                            onClick={() => handleBlockUnblock(record._id, false)}
                        />
                    ) : (
                        <SecondaryBtnSM
                            text="Unblock"
                            type="default"
                            disabled={isUnblocking}
                            onClick={() => handleBlockUnblock(record._id, true)}
                        />
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <ServiceHeader title="Manage Users" text="Discover more about this book and make it yours today." />
            <Table
                columns={columns}
                dataSource={userData}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
                bordered
            />
        </div>
    );
};

export default ManageUsers;

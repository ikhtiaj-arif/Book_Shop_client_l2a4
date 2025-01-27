import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar = ({ collapsed }) => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate(); // Initialize the navigate function

  // If there's no user, don't render the sidebar
  if (!user) {
    return null;
  }

  // Generate Sidebar items based on user role
  const sidebarItems = user.role === userRole.ADMIN ? [
    {
      key: '1',
      label: 'Admin Dashboard',
      onClick: () => navigate('/admin') // Navigate to admin dashboard
    },
    {
      key: '2',
      label: 'Manage Products',
      onClick: () => navigate('/admin/products') // Navigate to manage products page
    },
    {
      key: '3',
      label: 'Orders',
      onClick: () => navigate('/admin/orders') // Navigate to orders page
    },
    {
      key: '4',
      label: 'Users',
      onClick: () => navigate('/admin/users') // Navigate to orders page
    },
  ] : [
    {
      key: '1',
      label: 'User Dashboard',
      onClick: () => navigate('/user/dashboard') // Navigate to user dashboard
    },
    {
      key: '2',
      label: 'Profile',
      onClick: () => navigate('/user/profile') // Navigate to user profile page
    },
    {
      key: '3',
      label: 'Orders',
      onClick: () => navigate('/user/orders') // Navigate to user orders page
    },
  ];
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/login');
  }

  return (


    <Sider
    width={160}
    collapsedWidth={50}
    style={{
      marginTop: '63px',
      backgroundColor: 'var(--background-color)', // Use primary color for Sider background
    }}
    trigger={null}
    collapsible
    collapsed={collapsed}
  >
    <div className="demo-logo-vertical" />
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{
        backgroundColor: 'var(--background-color)', // Ensure Menu matches Sider color
        color: 'var(--text-color)', // Use text color for Menu items
      }}
      items={[
        {
          key: '1',
          icon: <UserOutlined style={{ color: 'var(--text-color)' }} />, // Apply text color to icons
          label: <span style={{ color: 'var(--text-color)' }}>Nav 1</span>, // Use text color for label
        },
        {
          key: '2',
          icon: <VideoCameraOutlined style={{ color: 'var(--text-color)' }} />,
          label: <span style={{ color: 'var(--text-color)' }}>Nav 2</span>,
        },
        {
          key: '3',
          icon: <UploadOutlined style={{ color: 'var(--text-color)' }} />,
          label: <span style={{ color: 'var(--text-color)' }}>Nav 3</span>,
        },
      ]}
    />
    <Button
      type="link"
      onClick={handleLogout}
      style={{
        color: 'var(--text-color)', // Use text color for logout button
        marginTop: '16px',
        width: '100%',
      }}
    >
      Logout
    </Button>
  </Sider>
  );
};

export default Sidebar;

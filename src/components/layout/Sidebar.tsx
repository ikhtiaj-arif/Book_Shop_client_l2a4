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


    <Sider width={160} collapsedWidth={50} style={{ marginTop: '63px' }} trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        // style={{width:' 100px'}}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}



      //         items={sidebarItems.map(item => ({
      //             key: item.key,
      //             label: item.label,
      //             onClick: item.onClick, // Handle click with the navigation function
      //         }))}

      />
      <Button type="link" onClick={handleLogout} style={{ color: "#fff" }}>
        Logout
      </Button>
    </Sider>
  );
};

export default Sidebar;

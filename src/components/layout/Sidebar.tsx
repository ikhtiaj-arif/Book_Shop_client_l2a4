import { UploadOutlined, UserOutlined, VideoCameraOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { Sider } = Layout;

const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar = ({ collapsed }) => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (!user) {
    return null;
  }

  // Sidebar items based on user role
  const sidebarItems = [
    ...(user.role === userRole.ADMIN
      ? [
          { key: '1', label: 'Admin Dashboard', icon: <UserOutlined />, onClick: () => navigate('/admin') },
          { key: '2', label: 'Manage Products', icon: <VideoCameraOutlined />, onClick: () => navigate('/admin/products') },
          { key: '3', label: 'Orders', icon: <UploadOutlined />, onClick: () => navigate('/admin/orders') },
          { key: '4', label: 'Users', icon: <UserOutlined />, onClick: () => navigate('/admin/users') },
        ]
      : [
          { key: '1', label: 'User Dashboard', icon: <UserOutlined />, onClick: () => navigate('/user/dashboard') },
          { key: '2', label: 'Profile', icon: <VideoCameraOutlined />, onClick: () => navigate('/user/profile') },
          { key: '3', label: 'Orders', icon: <UploadOutlined />, onClick: () => navigate('/user/orders') },
        ]),
    { key: '5', label: 'Common Route', icon: <UploadOutlined />, onClick: () => navigate('/common') },
    { key: '6', label: 'Logout', icon: <LogoutOutlined />, onClick: () => dispatch(logOut()) || navigate('/login') }, // Logout option
  ];

  return (
    <Sider
      className="bg-background border rounded-md"
      width={160}
      collapsedWidth={50}
      style={{
        marginTop: '63px',
        height: 'calc(100vh - 63px)',
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      {/* Custom Menu */}
      <ul className="flex flex-col gap-4 p-4">
        {sidebarItems.map((item) => (
          <li
            key={item.key}
            onClick={item.onClick}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent transition"
          >
            <span className="text-secondary text-xl">{item.icon}</span>
            {!collapsed && <span className="text-text">{item.label}</span>}
          </li>
        ))}
      </ul>
    </Sider>
  );
};

export default Sidebar;

import { LogoutOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Add useLocation
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { Sider } = Layout;
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const userRole = {
  ADMIN: 'admin',
  USER: 'user',
};

const Sidebar: React.FC<React.PropsWithChildren<SidebarProps>> = ({ collapsed, setCollapsed }) => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation(); // Get the current location
  const [collapsedWidth, setCollapsedWidth] = useState(50);

  if (!user) {
    return null;
  }

  // Sidebar items based on user role
  const sidebarItems = [
    ...(user.role === userRole.ADMIN
      ? [
        { key: '1', label: 'Admin Dashboard', icon: <UserOutlined />, path: '/admin' },
        { key: '2', label: 'Manage Products', icon: <VideoCameraOutlined />, path: '/admin/products' },
        { key: '3', label: 'Manage Orders', icon: <UploadOutlined />, path: '/admin/manage-orders' },
        { key: '4', label: 'Manage Users', icon: <UserOutlined />, path: '/admin/manage-users' },
      ]
      : [
        { key: '1', label: 'User Dashboard', icon: <UserOutlined />, path: '/user/dashboard' },
        { key: '2', label: 'Profile', icon: <VideoCameraOutlined />, path: '/user/profile' },
        { key: '3', label: 'Orders', icon: <UploadOutlined />, path: '/user/orders' },
      ]),
    { key: '5', label: 'View Orders', icon: <UploadOutlined />, path: '/orders' },
    { key: '6', label: 'Logout', icon: <LogoutOutlined />, onClick: () => dispatch(logOut()) || navigate('/login') }, // Logout option
  ];

  return (
    <Sider
      className="bg-background border rounded-md"
      width={190}
      collapsedWidth={collapsedWidth}
      style={{
        marginTop: '63px',
        height: 'calc(100vh - 67px)',
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      onBreakpoint={(broken) => {
        setCollapsed(broken);
        setCollapsedWidth(broken ? 40 : 50)
      }}
    >
      {/* Custom Menu */}
      <ul className="flex flex-col gap-2 p-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.key}
              onClick={() => item.onClick ? item.onClick() : navigate(item.path)}
              className={`
                flex items-center gap-3 p-2 rounded-lg cursor-pointer 
                hover:bg-primary  transition-colors duration-200
                ${collapsed ? 'justify-center' : ''}
                ${isActive ? 'bg-primary-dark text-white hover:bg-primary' : 'text-text hover:bg-opacity-10'}
              `}
            >
              <span className={`text-xl ${isActive ? 'text-white' : 'text-primary'}`}>{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </Sider>
  );
};

export default Sidebar;
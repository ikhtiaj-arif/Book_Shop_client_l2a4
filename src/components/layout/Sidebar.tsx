import { LogoutOutlined, ProfileOutlined, ShoppingCartOutlined, TeamOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
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
        {
          key: "2",
          label: "Manage Products",
          icon: <ShoppingCartOutlined />, // Represents managing products
          path: "/admin/products",
        },
        {
          key: "3",
          label: "Manage Orders",
          icon: <UnorderedListOutlined />, // Represents managing orders
          path: "/admin/manage-orders",
        },
        {
          key: "4",
          label: "Manage Users",
          icon: <TeamOutlined />, // Represents managing users
          path: "/admin/manage-users",
        },
      ]
      : [
        {
          key: "2",
          label: "Profile",
          icon: <UserOutlined />, // Represents user profile
          path: `/user/profile/${user?.id}`,
        },
      ]),

    {
      key: "5",
      label: "My Orders",
      icon: <ProfileOutlined />, // Represents viewing orders
      path: `/orders/${user?.id}`,
    },
    {
      key: "6",
      label: "Logout",
      icon: <LogoutOutlined />, // Represents logout
      onClick: () => dispatch(logOut()) || navigate("/login"),
    },
  ];// Logout option


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
      <ul className="flex flex-col gap-2 p-1 md:p-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.key}
              onClick={() => item.onClick ? item.onClick() : navigate(item?.path)}
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
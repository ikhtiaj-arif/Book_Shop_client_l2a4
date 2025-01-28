import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Layout, Menu, MenuProps, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Sidebar from './Sidebar';

const { Header, Content } = Layout;
const { Search } = Input;

const MainLayout: React.FC = () => {
  const user = useAppSelector(currentUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState<string>(''); // State for search input
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Handle search
  const onSearch: MenuProps['onSearch'] = (value) => {
    console.log('Search Text:', value);
    setSearchValue(''); // Clear search input after search
  };

  return (
    <Layout className="h-[100vh] overflow-hidden">
      {/* Header */}
      <Header
        className="bg-background fixed flex items-center w-full z-10 border-b-2"
        style={{
          backgroundColor: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: '0 24px',
          height: '64px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          left: 0, // Ensure the header is aligned to the left
          right: 0, // Ensure the header spans the full width
        }}
      >
        {/* Logo */}
        <div className="demo-logo bg-primary h-10 w-10 rounded-full" />

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(!drawerVisible)}
          className="md:hidden ml-auto"
          style={{ color: '#1890ff' }} // Match the sidebar's primary color
        />

        {/* Desktop Menu */}
        <Menu
          theme="light"
          mode="horizontal"
          className="bg-background border-0 hidden md:flex flex-grow justify-center"
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex items-center gap-10">
            <Link
              className="text-text hover:text-text-accent font-medium"
              to="/"
              style={{ color: '#595959' }} // Match the sidebar's text color
            >
              Home
            </Link>
            <Link
              className="text-text hover:text-text-accent font-medium"
              to="/about"
              style={{ color: '#595959' }}
            >
              About
            </Link>
            <Link
              className="text-text hover:text-text-accent font-medium"
              to="/contact"
              style={{ color: '#595959' }}
            >
              Contact
            </Link>
          </div>
        </Menu>

        {/* Search and Profile (Desktop Only) */}
        <div className="hidden md:flex items-center gap-4">
          <Search
            placeholder="input search text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={onSearch}
            className="w-[200px]"
            style={{ borderRadius: '8px' }} // Match the sidebar's rounded corners
          />
          {user ? (
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="w-10 h-10 flex items-center justify-center"
              style={{ color: '#1890ff' }} // Match the sidebar's primary color
            />
          ) : (
            <Button
              type="link"
              onClick={() => navigate('/login')}
              style={{ color: '#1890ff' }} // Match the sidebar's primary color
            >
              Login
            </Button>
          )}
        </div>
      </Header>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
        style={{ backgroundColor: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        <Menu mode="vertical" className="bg-background border-0">
          {/* Search Bar */}
          <Menu.Item key="1" style={{ padding: '8px 16px' }}> {/* Add padding for better alignment */}
            <div style={{ display: 'flex', justifyContent: 'center' }}> {/* Center the search bar */}
              <Search
                placeholder="input search text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onSearch={onSearch}
                style={{ width: '100%', borderRadius: '8px' }} // Full width and rounded corners
              />
            </div>
          </Menu.Item>

          {/* Menu Items */}
          <Menu.Item key="2" style={{ padding: '8px 16px' }}> {/* Consistent padding */}
            <Link to="/" onClick={() => setDrawerVisible(false)} style={{ color: '#595959', textDecoration: 'none' }}>
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="3" style={{ padding: '8px 16px' }}>
            <Link to="/about" onClick={() => setDrawerVisible(false)} style={{ color: '#595959', textDecoration: 'none' }}>
              About
            </Link>
          </Menu.Item>
          {!user && (
            <Menu.Item key="4" style={{ padding: '8px 16px' }}>
              <Link to="/login" onClick={() => setDrawerVisible(false)} style={{ color: '#1890ff', textDecoration: 'none' }}>
                Login
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>

      {/* Content */}
      <Content>
        <Layout>
          {user && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
          <Content
            className="h-screen overflow-y-auto"
            style={{
              marginTop: '64px', // Offset content by the height of the header
              // marginLeft: user && !collapsed ? '200px' : '0', // Adjust margin based on sidebar visibility
              padding: '24px',
              backgroundColor: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'margin-left 0.2s', // Smooth transition for sidebar collapse
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default MainLayout;
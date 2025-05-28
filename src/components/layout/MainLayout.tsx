import { MenuOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Layout, Menu, Modal, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import CartButton from '../cart/CartButton';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const user = useAppSelector(currentUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleNavigate = (path: string) => {
    setAvatarModalVisible(false);
    navigate(path);
  };

  const megaMenuItems = [
    {
      title: 'Browse All Books',
      path: '/books',
    },
    {
      title: 'Kids',
      subMenu: [
        { title: 'Picture Books', path: '/books/kids/picture-books' },
        { title: 'Early Readers', path: '/books/kids/early-readers' },
      ],
    },
    {
      title: 'Best Sellers',
      subMenu: [
        { title: 'Fiction', path: '/books/best-sellers/fiction' },
        { title: 'Non-Fiction', path: '/books/best-sellers/non-fiction' },
      ],
    },
    {
      title: 'New Arrivals',
      subMenu: [
        { title: 'Fiction', path: '/books/new/fiction' },
        { title: 'Non-Fiction', path: '/books/new/non-fiction' },
      ],
    },
    {
      title: 'Genres',
      subMenu: [
        { title: 'Fiction', path: '/books/genre/fiction' },
        { title: 'Non-Fiction', path: '/books/genre/non-fiction' },
        { title: 'Biography', path: '/books/genre/biography' },
        { title: 'Fantasy', path: '/books/genre/fantasy' },
      ],
    },
  ];

  return (
    <Layout className="h-[100vh] overflow-hidden">
      {/* Header */}
      <Header className="fixed flex items-center h-22 left-0 right-0 w-full px-6 xl:px-10 z-10 bg-background border-b">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-10 w-10" alt="Logo" />
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text ">Book</span>{' '}
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text ">Shop</span>
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto flex items-center">
          {user ? (
            <Avatar
              size="large"
              className="cursor-pointer"
              onClick={() => setAvatarModalVisible(true)}
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          ) : (
            <Button
              type="link"
              onClick={() => navigate('/login')}
              className="text-primary"
            >
              Login
            </Button>
          )}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(!drawerVisible)}
            className="md:hidden ml-auto"
            style={{ color: 'var(--primary)' }}
          />
          <CartButton />
        </div>

        {/* Desktop Nav */}
        <Menu
          theme="light"
          mode="horizontal"
          className="bg-background border-0 hidden md:flex flex-grow justify-center"
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex items-center gap-10">
            {['/', '/about', '/contact'].map((route, i) => (
              <Link
                key={route}
                className="text-muted-foreground hover:text-primary font-medium"
                to={route}
              >
                {['Home', 'About', 'Contact'][i]}
              </Link>
            ))}
          </div>
        </Menu>

        {/* Avatar/Login */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Avatar
              size="large"
              className="cursor-pointer"
              onClick={() => setAvatarModalVisible(true)}
            >
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          ) : (
            <Button
              type="link"
              onClick={() => navigate('/login')}
              className="text-primary"
            >
              Login
            </Button>
          )}
          <CartButton />
        </div>
      </Header>

      {/* Desktop MegaMenu */}
      <div className="hidden md:flex w-full px-6 xl:px-10 bg-accent border-b shadow-sm z-10 relative top-[64px]">
        <Menu
          mode="horizontal"
          className="flex-grow"
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            fontWeight: 500,
          }}
        >
          {megaMenuItems.map((item, index) =>
            item.subMenu ? (
              <Menu.SubMenu key={index} title={item.title}>
                {item.subMenu.map((subItem) => (
                  <Menu.Item key={subItem.path}>
                    <Link to={subItem.path}>{subItem.title}</Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path}>
                <Link to={item.path} className="text-foreground hover:text-primary">
                  {item.title}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
        className="bg-background"
      >
        <Menu mode="vertical" className="bg-background border-0">
          {['/', '/about', '/contact'].map((route, i) => (
            <Menu.Item key={route} style={{ padding: '8px 16px' }}>
              <Link
                to={route}
                onClick={() => setDrawerVisible(false)}
                className="text-muted-foreground"
              >
                {['Home', 'About', 'Contact'][i]}
              </Link>
            </Menu.Item>
          ))}
          <Menu.ItemGroup title="Categories">
            {megaMenuItems.map((item, i) =>
              item.subMenu ? (
                <Menu.SubMenu key={`mobile-${i}`} title={item.title}>
                  {item.subMenu.map((subItem) => (
                    <Menu.Item key={subItem.path}>
                      <Link to={subItem.path} onClick={() => setDrawerVisible(false)}>
                        {subItem.title}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.path}>
                  <Link to={item.path} onClick={() => setDrawerVisible(false)}>
                    {item.title}
                  </Link>
                </Menu.Item>
              )
            )}
          </Menu.ItemGroup>
        </Menu>
      </Drawer>

      {/* Avatar Modal */}
      <Modal
        title="Account Options"
        open={avatarModalVisible}
        onCancel={() => setAvatarModalVisible(false)}
        footer={null}
      >
        <Menu mode="vertical" selectable={false}>
          <Menu.Item onClick={() => handleNavigate(`/${user?.role}/profile`)}>Profile</Menu.Item>
          <Menu.Item onClick={() => handleNavigate(`/${user?.role}/dashboard`)}>Dashboard</Menu.Item>
        </Menu>
      </Modal>

      {/* Content */}
      <Content className="h-screen overflow-y-auto" style={{ marginTop: '64px', backgroundColor: colorBgContainer }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;

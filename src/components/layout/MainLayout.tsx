import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import React, { useState } from 'react';

import { SearchProps } from 'antd/es/input';
import { Content, Header } from 'antd/es/layout/layout';
import Search from 'antd/es/transfer/search';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Sidebar from './Sidebar';

// const { Header, Content } = Layout;

const MainLayout = () => {
  //   const navigate = useNavigate();
  const user = useAppSelector(currentUser)
  //   const [drawerVisible, setDrawerVisible] = useState(false);

  //   const handleNavigate = (path) => {
  //     navigate(path);
  //     setDrawerVisible(false); // Close the drawer after navigation
  //   };
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/login');
  }

  //   console.log(user);
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  );
  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  return (
    // <Layout style={{ height: "100vh" }}>
    //   {
    //     user &&
    //     <Sidebar  />
    //   }
    //   <Layout>

    //     {/* HEADER */}
    //     <Header
    //       style={{
    //         padding: "0 16px",
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         background: "#001529", // Ant Design default primary color
    //         color: "#fff",
    //       }}
    //     >


    //       {/* Hamburger Menu for Mobile */}
    //       <MenuOutlined
    //         style={{
    //           fontSize: "24px",
    //           cursor: "pointer",
    //           display: "none", // Hide by default
    //         }}
    //         className="mobile-menu-icon"
    //         onClick={() => setDrawerVisible(true)}
    //       />

    //       {/* Buttons for Desktop */}
    //       <div className="desktop-menu" style={{ display: "flex", gap: "12px" }}>
    //         <Button type="link" onClick={() => navigate('/')} style={{ color: "#fff" }}>
    //           Home
    //         </Button>
    //         <Button type="link" onClick={() => navigate('/about')} style={{ color: "#fff" }}>
    //           About
    //         </Button>
    //         {
    //           user ? <FaUserCheck onClick={() => navigate(`${user?.role}`)} style={{
    //             fontSize: "20px",
    //             margin: 'auto 0',
    //             cursor: "pointer",

    //           }} /> :
    //             <Button type="link" onClick={() => navigate('/login')} style={{ color: "#fff" }}>
    //               Login
    //             </Button>
    //         }
    //         <Button type="link" onClick={handleLogout} style={{ color: "#fff" }}>
    //           Logout
    //         </Button>
    //         <Button type="link" onClick={() => navigate('/register')} style={{ color: "#fff" }}>
    //           Register
    //         </Button>
    //       </div>
    //     </Header>



    //     {/* CONTENT */}
    //     <Content style={{ margin: '24px 16px 0', overflow: "auto" }}>
    //       <div
    //         style={{
    //           padding: "24px",
    //           background: "#fff",
    //           minHeight: "100%",
    //           borderRadius: "8px",
    //           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    //         }}
    //       >
    //         <Outlet />
    //       </div>
    //     </Content>
    //   </Layout>
    // </Layout>
    <Layout className='h-[100vh]'>
      <Header className="bg-background fixed flex  items-center w-full md:px-[50px] xl:px-[70px] 2xl:px-[156px]  z-10 border border-b-2">
        <div className="demo-logo bg-primary h-10 w-10 rounded-full" />
        <Menu theme="dark" mode="horizontal" className="bg-background border-0 mx-auto">
          <div className='flex items-center gap-10'>
            <Link className="text-text hover:text-text-accent font-medium" to="/">
              Home
            </Link>

            <Link className="text-text hover:text-text-accent font-medium" to='/about'>
              About
            </Link>
            <Link className="text-text hover:text-text-accent font-medium" to='/about'>
              About
            </Link>

            {/* <Link className="text-text hover:text-text-accent font-medium" to='/register'>
              Register
            </Link> */}

          </div>
        </Menu>
        <div className='flex items-center'>

          <Search

            // addonBefore="https://"
            placeholder="input search text "
          />
          {user ? (
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <Button type="link" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </div>

      </Header>
      <Content>
        <Layout className="">
          {user && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}
          <Content className=" h-screen mt-[65px] overflow-y-scroll overflow-x-hidden">
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>

  );
};

export default MainLayout;

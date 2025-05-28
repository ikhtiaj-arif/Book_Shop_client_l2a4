import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { currentUser } from '../../redux/features/auth/authSlice';
import { Header } from 'antd/es/layout/layout';
import logo from '../../img/logo.png';

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector(currentUser);

  return (
    
    <Layout className="h-screen">
          <Header className="fixed flex items-center h-22 left-0 right-0 w-full px-6 xl:px-10 z-10 bg-primary border-b">
        <div className="flex items-center gap-2">
          <img src={logo} className="h-10 w-10" alt="" />
          <h1 className="text-xl md:text-2xl font-bold">Book <span className="text-primary">Shop</span></h1>
        </div>

          {/* <h1 className="font-bold text-center w-full text-xl">Dashboard</h1> */}
          {/* You can add user avatar + modal menu here */}
        </Header>
      {user && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <Content
        style={{
         
          marginTop:  63 ,
          transition: 'margin-left 0.2s',
          padding: '24px',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DashboardLayout;

import { Button, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();
    return (
        <Layout style={{ height: "100vh" }}>
            {/* <Sidebar /> */}
            <Layout>
                <Header style={{ padding: 0, }} >
                    <div style={{ margin: '0 auto' }}>

                        <Button onClick={() => navigate('/')}>Home</Button>
                        <Button onClick={() => navigate('/about')}>About</Button>
                        <Button onClick={() => navigate('/login')}>Login</Button>
                        <Button onClick={() => navigate('/register')}>Register</Button>
                    </div>


                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div

                    >
                        <Outlet />
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

export default MainLayout;
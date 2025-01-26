import { MenuOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useState } from 'react';
import { FaUserCheck } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const { Header, Content } = Layout;

const MainLayout = () => {
    const navigate = useNavigate();
    const user = useAppSelector(currentUser)
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setDrawerVisible(false); // Close the drawer after navigation
    };
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logOut())
        navigate('/login');
    }

    console.log(user);

    return (
        <Layout style={{ height: "100vh" }}>
            <Layout>
                {/* HEADER */}
                <Header
                    style={{
                        padding: "0 16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#001529", // Ant Design default primary color
                        color: "#fff",
                    }}
                >
                    <div
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#fff",
                        }}
                    >
                        My App
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <MenuOutlined
                        style={{
                            fontSize: "24px",
                            cursor: "pointer",
                            display: "none", // Hide by default
                        }}
                        className="mobile-menu-icon"
                        onClick={() => setDrawerVisible(true)}
                    />

                    {/* Buttons for Desktop */}
                    <div className="desktop-menu" style={{ display: "flex", gap: "12px" }}>
                        <Button type="link" onClick={() => navigate('/')} style={{ color: "#fff" }}>
                            Home
                        </Button>
                        <Button type="link" onClick={() => navigate('/about')} style={{ color: "#fff" }}>
                            About
                        </Button>
                        {
                            user ? <FaUserCheck onClick={() => navigate(`${user?.role}`)} style={{
                                fontSize: "20px",
                                margin: 'auto 0',
                                cursor: "pointer",

                            }} /> :
                                <Button type="link" onClick={() => navigate('/login')} style={{ color: "#fff" }}>
                                    Login
                                </Button>
                        }
                        <Button type="link" onClick={handleLogout} style={{ color: "#fff" }}>
                            Logout
                        </Button>
                        <Button type="link" onClick={() => navigate('/register')} style={{ color: "#fff" }}>
                            Register
                        </Button>
                    </div>
                </Header>



                {/* CONTENT */}
                <Content style={{ margin: '24px 16px 0', overflow: "auto" }}>
                    <div
                        style={{
                            padding: "24px",
                            background: "#fff",
                            minHeight: "100%",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { currentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    USER: 'user',
};

const Sidebar = () => {
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

    return (
        <Sider
            style={{
                height: '100vh',
                position: 'sticky',
                top: '0',
                left: '0',
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div
                style={{
                    color: 'white',
                    textAlign: 'center',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}  // Default selected key
                items={sidebarItems.map(item => ({
                    key: item.key,
                    label: item.label,
                    onClick: item.onClick, // Handle click with the navigation function
                }))}
            />
        </Sider>
    );
};

export default Sidebar;

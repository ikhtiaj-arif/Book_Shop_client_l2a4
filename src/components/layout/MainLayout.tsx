
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FaUserCheck } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';




import ThemeToggle from "../ui/mode-toggle";
import Sidebar from './Sidebar';




const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const user = useAppSelector(currentUser);
    const navigate = useNavigate()

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logOut())
        navigate('/login');
    }


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-background bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Main Layout */}
            <div className="flex flex-1 flex-col ">
                {/* Header */}
                <header className="flex items-center justify-between bg-gray-900 text-white px-4 py-2 shadow-md lg:ml-0">
                    {/* Hamburger Menu for Mobile */}
                    <MenuOutlined
                        className="block lg:hidden cursor-pointer text-2xl"
                        onClick={toggleSidebar}
                    />

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link to="/" className="text-white hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/about" className="text-white hover:text-gray-300">
                            About
                        </Link>
                        {user ? (
                            <FaUserCheck
                                onClick={() => navigate(`${user?.role}`)}
                                className="text-xl cursor-pointer"
                            />
                        ) : (
                            <Link to="/login" className="text-white hover:text-gray-300">
                                Login
                            </Link>
                        )}
                        <Link
                            to="#"
                            onClick={handleLogout}
                            className="text-white hover:text-gray-300"
                        >
                            Logout
                        </Link>
                        <Link to="/register" className="text-white hover:text-gray-300">
                            Register
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>


                {/* Main Content */}
                <main className="flex-1 overflow-auto p-6 bg-background">
                    <div className="bg-white rounded-lg  shadow-md">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser, logOut } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';




import Header from './Header';
import Sidebar from './Sidebar';




const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector(currentUser);
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  // const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logOut())
    navigate('/login');
  }


  return (



    <div className='max-h-scree flex flex-col'>
      <button className="btn-custom">
        Custom Button
      </button>
      <Header />
      sidebar
      <Sidebar />
      <div className='bg-white'></div>

    </div>












    //   <div className="bg-background text-foreground flex min-h-screen">
    //   {/* Sidebar */}
    //   <aside
    //     className={`${
    //       isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    //     } fixed lg:relative top-0 left-0 h-full w-64 bg-card text-card-foreground shadow-md transform transition-transform duration-300 z-30`}
    //   >
    //     <div className="p-4 border-b">
    //       <h2 className="text-xl font-bold">Admin Panel</h2>
    //     </div>
    //     <nav className="flex flex-col gap-4 p-4">
    //       <Link to="/dashboard" className="hover:text-primary">
    //         Admin Dashboard
    //       </Link>
    //       <Link to="/products" className="hover:text-primary">
    //         Manage Products
    //       </Link>
    //       <Link to="/orders" className="hover:text-primary">
    //         Orders
    //       </Link>
    //       <Link to="/users" className="hover:text-primary">
    //         Users
    //       </Link>
    //     </nav>
    //   </aside>

    //   {/* Main Content */}
    //   <div
    //     className={`flex-1 ${
    //       isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
    //     } transition-all duration-300`}
    //   >
    //     {/* Header */}
    //     <header className="bg-accent text-primary-foreground shadow-md sticky top-0 z-20">
    //       <div className="flex items-center justify-between px-4 py-4">
    //         {/* Logo/Brand */}
    //         <Link
    //           to="/"
    //           className="text-lg text-secondary-foreground font-bold tracking-wide"
    //         >
    //           Book Shop
    //         </Link>

    //         {/* Hamburger Menu for Mobile */}
    //         <MenuOutlined
    //           className="block text-secondary-foreground lg:hidden cursor-pointer text-2xl"
    //           onClick={toggleMenu}
    //         />

    //         {/* Desktop Menu */}
    //         <nav className="hidden lg:flex items-center gap-6">
    //           <Link to="/" className="text-secondary-foreground transition-colors">
    //             Home
    //           </Link>
    //           <Link to="/about" className="text-secondary-foreground transition-colors">
    //             About
    //           </Link>
    //           {user ? (
    //             <FaUserCheck
    //               onClick={toggleSidebar}
    //               className="text-xl cursor-pointer text-secondary-foreground"
    //             />
    //           ) : (
    //             <Link
    //               to="/login"
    //               className="text-secondary-foreground transition-colors"
    //             >
    //               Login
    //             </Link>
    //           )}
    //           {user && (
    //             <button
    //               onClick={handleLogout}
    //               className="text-secondary-foreground transition-colors"
    //             >
    //               Logout
    //             </button>
    //           )}
    //           {!user && (
    //             <Link
    //               to="/register"
    //               className="text-secondary-foreground transition-colors"
    //             >
    //               Register
    //             </Link>
    //           )}
    //           <ThemeToggle />
    //         </nav>
    //       </div>

    //       {/* Mobile Menu */}
    //       {menuOpen && (
    //         <div className="lg:hidden bg-card text-card-foreground p-4 shadow-md">
    //           <nav className="flex flex-col gap-4">
    //             <Link to="/" onClick={toggleMenu} className="hover:text-primary">
    //               Home
    //             </Link>
    //             <Link to="/about" onClick={toggleMenu} className="hover:text-primary">
    //               About
    //             </Link>
    //             {user ? (
    //               <>
    //                 <FaUserCheck
    //                   onClick={toggleSidebar}
    //                   className="text-xl cursor-pointer hover:text-primary"
    //                 />
    //                 <button
    //                   onClick={() => {
    //                     handleLogout();
    //                     toggleMenu();
    //                   }}
    //                   className="hover:text-primary"
    //                 >
    //                   Logout
    //                 </button>
    //               </>
    //             ) : (
    //               <Link
    //                 to="/login"
    //                 onClick={toggleMenu}
    //                 className="hover:text-primary"
    //               >
    //                 Login
    //               </Link>
    //             )}
    //             {!user && (
    //               <Link
    //                 to="/register"
    //                 onClick={toggleMenu}
    //                 className="hover:text-primary"
    //               >
    //                 Register
    //               </Link>
    //             )}
    //             <ThemeToggle />
    //           </nav>
    //         </div>
    //       )}
    //     </header>

    //     {/* Page Content */}
    //     <main className="px-4 py-6">
    //       <Outlet />
    //     </main>
    //   </div>
    // </div>





    // <div className="bg-background text-foreground ">
    //     <header className="relative bg-accent text-primary-foreground shadow-md ">
    //         <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto">
    //             {/* Logo/Brand */}
    //             <Link to="/" className="text-lg text-secondary-foreground  font-bold tracking-wide">
    //                 Book Shop
    //             </Link>

    //             {/* Hamburger Menu for Mobile */}
    //             <MenuOutlined
    //                 className="block  text-secondary-foreground lg:hidden cursor-pointer text-2xl"
    //                 onClick={toggleMenu}
    //             />

    //             {/* Desktop Menu */}
    //             <nav className="hidden lg:flex items-center gap-6">
    //                 <Link to="/" className="text-secondary-foreground transition-colors">
    //                     Home
    //                 </Link>
    //                 <div className="relative">
    //                     <span className="absolute inset-y-0 left-0 flex items-center pl-2">
    //                         <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
    //                             <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-800">
    //                                 <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
    //                             </svg>
    //                         </button>
    //                     </span>
    //                     <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50" />
    //                 </div>
    //                 <Link to="/about" className="text-secondary-foreground transition-colors">
    //                     About
    //                 </Link>
    //                 {user ? (
    //                     <FaUserCheck
    //                         onClick={toggleSidebar}
    //                         className="text-xl cursor-pointer text-secondary-foreground"
    //                     />
    //                 ) : (
    //                     <Link to="/login" className="text-secondary-foreground transition-colors">
    //                         Login
    //                     </Link>
    //                 )}
    //                 {user && (
    //                     <button
    //                         onClick={handleLogout}
    //                         className="text-secondary-foreground transition-colors"
    //                     >
    //                         Logout
    //                     </button>
    //                 )}
    //                 {!user && (
    //                     <Link to="/register" className="text-secondary-foreground transition-colors">
    //                         Register
    //                     </Link>
    //                 )}
    //                 <ThemeToggle />
    //             </nav>

    //             {/* Mobile Menu */}
    //             {menuOpen && (
    //                 <div className="absolute top-16 left-0 w-full bg-secondary text-secondary-foreground p-4 shadow-lg lg:hidden z-10">
    //                     <nav className="flex flex-col gap-4">
    //                         <Link to="/" onClick={toggleMenu} className="hover:text-gray-300">
    //                             Home
    //                         </Link>
    //                         <Link to="/about" onClick={toggleMenu} className="hover:text-gray-300">
    //                             About
    //                         </Link>
    //                         {user ? (
    //                             <FaUserCheck
    //                                 onClick={toggleSidebar}
    //                                 className="text-xl cursor-pointer hover:text-gray-300"
    //                             />
    //                         ) : (
    //                             <Link to="/login" onClick={toggleMenu} className="hover:text-gray-300">
    //                                 Login
    //                             </Link>
    //                         )}
    //                         {user && (
    //                             <button
    //                                 onClick={() => {
    //                                     handleLogout();
    //                                     toggleMenu();
    //                                 }}
    //                                 className="hover:text-gray-300"
    //                             >
    //                                 Logout
    //                             </button>
    //                         )}
    //                         {!user && (
    //                             <Link to="/register" onClick={toggleMenu} className="hover:text-gray-300">
    //                                 Register
    //                             </Link>
    //                         )}
    //                         <ThemeToggle />
    //                     </nav>
    //                 </div>
    //             )}
    //         </div>
    //         {isSidebarOpen && (
    //             <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    //         )}


    //         {/* Mobile Action Button */}
    //         {!user && (
    //             <div className="lg:hidden px-4 py-2">
    //                 <Button className="w-full bg-primary text-primary-foreground">
    //                     <Link to="/login">Log in</Link>
    //                 </Button>
    //             </div>
    //         )}
    //         {/* Sidebar */}
    //     </header>

    //     <Outlet />


    // </div>
  );
};

export default MainLayout;

// import { createBrowserRouter } from "react-router-dom"
// import App from "../App"
// import RouteProtector from "../components/layout/RouteProtector"
// import About from "../pages/About"
// import AdminDashboard from "../pages/Admin/AdminDashboard"
// import ManageOrders from "../pages/Admin/ManageOrders"
// import ManageProduct from "../pages/Admin/ManageProduct"
// import ManageUsers from "../pages/Admin/ManageUsers"
// import AuthPage from "../pages/AuthPage"
// import Home from "../pages/Home"
// import AllProducts from "../pages/Products/AllProducts"
// import ProductDetails from "../pages/Products/ProductDetails"

// import CheckoutPage from "../pages/User/Checkout"
// import UserDashboard from "../pages/User/UserDashboard"
// import VerifyOrder from "../pages/User/VerifyOrder"
// import ViewOrders from "../pages/Orders/ViewOrders"
// import NotFoundPage from "../pages/NotFound"
// import Contact from "../pages/Contact"
// import Profile from "../pages/User/Profile"

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             {
//                 path: '/',
//                 element: <Home />
//             },
//             {
//                 path: '*',
//                 element: <NotFoundPage />
//             },
//             {
//                 path: '/login',
//                 element: <AuthPage />
//             },

//             {
//                 path: '/about',
//                 element: <About />
//             },
//             {
//                 path: '/contact',
//                 element: <Contact />
//             },
//             {
//                 path: '/products',
//                 element: <AllProducts />
//             },
//             {
//                 path: "/products/:id", element: <ProductDetails />
//             },
//             {
//                 path: "/checkout", element:
//                     <RouteProtector>

//                         <CheckoutPage />
//                     </RouteProtector>
//             },
//             {
//                 path: "/orders/:id", element:
//                     <RouteProtector>
//                         <ViewOrders />
//                     </RouteProtector>
//             },
//             {
//                 path: "/user/profile/:id", element: <RouteProtector>

//                     <Profile />
//                 </RouteProtector>
//             },

//             {
//                 path: '/order/verify',
//                 element: <RouteProtector>
//                     < VerifyOrder />
//                 </RouteProtector>,
//             },
//             {
//                 path: '/user',
//                 element:
//                     <RouteProtector>
//                         <UserDashboard />
//                     </RouteProtector>
//             },
//             {
//                 path: '/admin',
//                 element:
//                     <RouteProtector adminOnly={true}>
//                         <AdminDashboard />
//                     </RouteProtector>,
//                 children: [
//                     {

//                         index: true,
//                         element: <RouteProtector adminOnly={true}>
//                             <AdminDashboard />
//                         </RouteProtector>,
//                     },
//                     {
//                         path: 'manage-users',
//                         element: <RouteProtector adminOnly={true}>
//                             <ManageUsers />
//                         </RouteProtector>,
//                     },
//                     {
//                         path: 'manage-orders',
//                         element: <RouteProtector adminOnly={true}>
//                             <ManageOrders />
//                         </RouteProtector>,
//                     },

//                     {
//                         path: 'products',
//                         element: <RouteProtector adminOnly={true}>
//                             <ManageProduct />
//                         </RouteProtector>,
//                     },
//                 ]
//             },
//             {

//             }
//         ]
//     },






// ])

// export default router

import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import RouteProtector from '../layouts/RouteProtector';
import AboutPage from '../pages/about';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AuthPage from '../pages/auth';
import BookDetailPage from '../pages/book-details';
import BooksPage from '../pages/books';
import CategoriesPage from '../pages/categories';
import ContactPage from '../pages/contact';
import HomePage from '../pages/home';
import CheckoutPage from '../pages/user/CheckoutPage';
import UserDashboard from '../pages/user/UserDashboard';
import VerifyOrder from '../pages/user/VerifyOrder';
import ViewOrders from '../pages/user/ViewOrders';
import ManageBooks from '../pages/admin/books/ManageBooks';
import ManageCategories from '@/pages/admin/categories/ManageCategories';
// import DashboardLayout from '../components/layout/DashboardLayout';
// import MainLayout from '../components/layout/MainLayout';
// import RouteProtector from '../components/layout/RouteProtector';

// import About from '../pages/About';
// import AuthPage from '../pages/AuthPage';
// import Contact from '../pages/Contact';
// import Home from '../pages/Home';
// import NotFoundPage from '../pages/NotFound';

// import AllProducts from '../pages/Products/AllProducts';
// import ProductDetails from '../pages/Products/ProductDetails';

// import ViewOrders from '../pages/Orders/ViewOrders';
// import CheckoutPage from '../pages/User/Checkout';
// import Profile from '../pages/User/Profile';
// import UserDashboard from '../pages/User/UserDashboard';
// import VerifyOrder from '../pages/User/VerifyOrder';

// import AdminDashboard from '../pages/Admin/AdminDashboard';
// import ManageOrders from '../pages/Admin/ManageOrders';
// import ManageProduct from '../pages/Admin/ManageProduct';
// import ManageUsers from '../pages/Admin/ManageUsers';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/about', element: <AboutPage /> },
            { path: '/contact', element: <ContactPage /> },
            { path: '/categories', element: <CategoriesPage /> },
            { path: '/books', element: <BooksPage /> },
            { path: '/books/:id', element: <BookDetailPage /> },
            { path: '/login', element: <AuthPage /> },
            // { path: '/books/:id', element: <ProductDetails /> },
            //     { path: '/products', element: <AllProducts /> },
            //     { path: '*', element: <NotFoundPage /> },
        ],
    },
    {
        path: '/',
        element: (
            <RouteProtector>
                <DashboardLayout />
            </RouteProtector>
        ),
        children: [
            { path: 'checkout', element: <CheckoutPage /> },
            { path: 'orders/:id', element: <ViewOrders /> },
            { path: 'order/verify', element: <VerifyOrder /> },
            { path: 'user/dashboard', element: <UserDashboard /> },
            // { path: 'user/profile/:id', element: <Profile /> },
        ],
    },
    {
        path: '/admin',
        element: (
            <RouteProtector adminOnly={true}>
                <DashboardLayout />
            </RouteProtector>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'manage-books', element: <ManageBooks /> },
            { path: 'manage-categories', element: <ManageCategories /> },
            // { path: 'manage-users', element: <ManageUsers /> },
            // { path: 'manage-orders', element: <ManageOrders /> },
        ],
    },
]);

export default router;

import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import RouteProtector from "../components/layout/RouteProtector"
import About from "../pages/About"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import ManageOrders from "../pages/Admin/ManageOrders"
import ManageProduct from "../pages/Admin/ManageProduct"
import ManageUsers from "../pages/Admin/ManageUsers"
import AuthPage from "../pages/AuthPage"
import Home from "../pages/Home"
import AllProducts from "../pages/Products/AllProducts"
import ProductDetails from "../pages/Products/ProductDetails"

import CheckoutPage from "../pages/User/Checkout"
import UserDashboard from "../pages/User/UserDashboard"
import VerifyOrder from "../pages/User/VerifyOrder"
import ViewOrders from "../pages/Orders/ViewOrders"
import NotFoundPage from "../pages/NotFound"
import Contact from "../pages/Contact"
import Profile from "../pages/User/Profile"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: <NotFoundPage />
            },
            {
                path: '/login',
                element: <AuthPage />
            },

            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/products',
                element: <AllProducts />
            },
            {
                path: "/products/:id", element: <ProductDetails />
            },
            {
                path: "/checkout", element:
                    <RouteProtector>

                        <CheckoutPage />
                    </RouteProtector>
            },
            {
                path: "/orders/:id", element:
                    <RouteProtector>
                        <ViewOrders />
                    </RouteProtector>
            },
            {
                path: "/user/profile/:id", element: <RouteProtector>

                    <Profile />
                </RouteProtector>
            },

            {
                path: '/order/verify',
                element: <RouteProtector>
                    < VerifyOrder />
                </RouteProtector>,
            },
            {
                path: '/user',
                element:
                    <RouteProtector>
                        <UserDashboard />
                    </RouteProtector>
            },
            {
                path: '/admin',
                element:
                    <RouteProtector adminOnly={true}>
                        <AdminDashboard />
                    </RouteProtector>,
                children: [
                    {

                        index: true,
                        element: <RouteProtector adminOnly={true}>
                            <AdminDashboard />
                        </RouteProtector>,
                    },
                    {
                        path: 'manage-users',
                        element: <RouteProtector adminOnly={true}>
                            <ManageUsers />
                        </RouteProtector>,
                    },
                    {
                        path: 'manage-orders',
                        element: <RouteProtector adminOnly={true}>
                            <ManageOrders />
                        </RouteProtector>,
                    },

                    {
                        path: 'products',
                        element: <RouteProtector adminOnly={true}>
                            <ManageProduct />
                        </RouteProtector>,
                    },
                ]
            },
            {

            }
        ]
    },






])

export default router
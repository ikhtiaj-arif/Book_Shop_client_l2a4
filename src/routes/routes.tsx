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
import Register from "../pages/Register"
import CheckoutPage from "../pages/User/Checkout"
import UserDashboard from "../pages/User/UserDashboard"
import VerifyOrder from "../pages/User/VerifyOrder"

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
                path: '/login',
                element: <AuthPage />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/products',
                element: <AllProducts />
            },
            {
                path: "/products/:id", element: <ProductDetails />
            },
            {
                path: "/checkout", element: <CheckoutPage />
            },
            {
                path: '/order/verify',
                element: <RouteProtector>
                    < VerifyOrder/>
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
                    <RouteProtector>
                        <AdminDashboard />
                    </RouteProtector>,
                children: [
                    {

                        index: true,
                        element: <RouteProtector>
                            <AdminDashboard />
                        </RouteProtector>,
                    },
                    {
                        path: 'users',
                        element: <RouteProtector>
                            <ManageUsers />
                        </RouteProtector>,
                    },
                    {
                        path: 'orders',
                        element: <RouteProtector>
                            <ManageOrders />
                        </RouteProtector>,
                    },
                
                    {
                        path: 'products',
                        element: <RouteProtector>
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
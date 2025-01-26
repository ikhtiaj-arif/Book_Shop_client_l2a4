import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import RouteProtector from "../components/layout/RouteProtector"
import About from "../pages/About"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import ManageOrders from "../pages/Admin/ManageOrders"
import ManageProduct from "../pages/Admin/ManageProduct"
import ManageUsers from "../pages/Admin/ManageUsers"
import Home from "../pages/Home"
import Login from "../pages/Login"
import AllProducts from "../pages/Products/AllProducts"
import Register from "../pages/Register"
import UserDashboard from "../pages/User/UserDashboard"

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
                path: '/about',
                element: <About />
            },
            {
                path: '/products',
                element: <AllProducts />
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

    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },




])

export default router
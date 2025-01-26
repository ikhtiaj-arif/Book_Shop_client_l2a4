import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import About from "../pages/About"
import Login from "../pages/Login"
import Register from "../pages/Register"
import AdminDashboard from "../pages/Admin/AdminDashboard"
import RouteProtector from "../components/layout/RouteProtector"
import UserDashboard from "../pages/User/UserDashboard"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/about',
                element: <About />
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
                    </RouteProtector>
            },
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
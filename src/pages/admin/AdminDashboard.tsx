/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetOrdersQuery } from "@/redux/features/orders/order.api"
import { useGetAllProductsQuery } from "@/redux/features/products/products.api"
import {
    Activity,
    BookOpen,
    Calendar,
    DollarSign,
    Eye,
    Package,
    ShoppingCart,
    Star,
    TrendingUp,
    UserCheck,
    Users,
    UserX,
} from "lucide-react"
import type React from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

// Mock API hooks - replace with your actual hooks
const useGetAllUsersQuery = () => ({
    data: {
        success: true,
        message: "User Retrieved successfully!",
        statusCode: 200,
        data: [
            {
                _id: "679e02fc3dd904a2bcec4ebd",
                name: "Admin",
                email: "admin@admin.com",
                role: "admin",
                isBlocked: false,
                createdAt: "2025-02-01T11:18:20.241Z",
                updatedAt: "2025-02-01T11:18:20.241Z",
                __v: 0,
            },
            {
                _id: "679e03453dd904a2bcec4ec1",
                name: "Mr Stark",
                email: "stark@journey.com",
                role: "user",
                isBlocked: true,
                createdAt: "2025-02-01T11:19:33.188Z",
                updatedAt: "2025-02-01T13:45:35.315Z",
                __v: 0,
            },
            {
                _id: "679e246c90bcd086f4e251f8",
                name: "User One",
                email: "user1@user.com",
                role: "user",
                isBlocked: true,
                createdAt: "2025-02-01T13:41:00.617Z",
                updatedAt: "2025-02-10T12:30:13.214Z",
                __v: 0,
            },
            {
                _id: "67a9efb29fd6b812c7bb7919",
                name: "Breanna Logan",
                email: "hero2@gmail.com",
                role: "user",
                isBlocked: false,
                createdAt: "2025-02-10T12:23:14.258Z",
                updatedAt: "2025-02-10T12:23:14.258Z",
                __v: 0,
            },
            {
                _id: "68358fadc7c4fdcc64dbbc51",
                name: "Mr Starkwqe",
                email: "stark23@journey.com",
                role: "admin",
                isBlocked: false,
                createdAt: "2025-05-27T10:10:53.319Z",
                updatedAt: "2025-05-27T10:10:53.319Z",
                __v: 0,
            },
        ],
    },
    isLoading: false,
})

const useGetTotalRevenueQuery = () => ({
    data: {
        message: "Revenue calculated successfully",
        status: true,
        data: {
            totalRevenue: 44,
        },
    },
    isLoading: false,
})

// Types
interface User {
    _id: string
    name: string
    email: string
    role: string
    isBlocked: boolean
    createdAt: string
    updatedAt: string
}

interface Order {
    _id: string
    user: string
    products: Array<{
        product: string
        quantity: number
        _id: string
    }>
    totalPrice: number
    status: string
    createdAt: string
    updatedAt: string
    transaction: {
        id: string
        transactionStatus: string | null
        bank_status: string
        method: string
    }
}

interface Book {
    _id: string
    title: string
    author: string
    price: number
    originalPrice: number
    rating: number
    reviewCount: number
    inStock: boolean
    stockQuantity: number
    featured: boolean
    bestseller: boolean
    newArrival: boolean
    category: {
        name: string
    }
    createdAt: string
}

const AdminDashboard: React.FC = () => {
    const { data: ordersData, isLoading: ordersLoading } = useGetOrdersQuery(undefined)
    const { data: booksData, isLoading: booksLoading } = useGetAllProductsQuery({ limit: 100 })
    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery()
    const { data: revenueData, isLoading: revenueLoading } = useGetTotalRevenueQuery()

    const orders = ordersData?.data || []
    const books = booksData?.data || []
    const users = usersData?.data || []
    const totalRevenue = revenueData?.data?.totalRevenue || 0

    // Calculate statistics
    const totalUsers = users.length
    const activeUsers = users.filter((user: User) => !user.isBlocked).length
    const blockedUsers = users.filter((user: User) => user.isBlocked).length
    const adminUsers = users.filter((user: User) => user.role === "admin").length

    const totalOrders = orders.length
    const pendingOrders = orders.filter((order: Order) => order.status === "Pending").length
    const completedOrders = orders.filter((order: Order) => order.status === "Completed").length
    const paidOrders = orders.filter((order: Order) => order.status === "Paid").length

    const totalBooks = books.length
    const inStockBooks = books.filter((book: Book) => book.inStock).length
    const outOfStockBooks = books.filter((book: Book) => !book.inStock).length
    const featuredBooks = books.filter((book: Book) => book.featured).length

    // Chart data
    const orderStatusData = [
        { name: "Pending", value: pendingOrders, color: "#f59e0b" },
        { name: "Paid", value: paidOrders, color: "#10b981" },
        { name: "Completed", value: completedOrders, color: "#3b82f6" },
        {
            name: "Cancelled",
            value: orders.filter((order: Order) => order.status === "Cancelled").length,
            color: "#ef4444",
        },
    ]

    // const userRoleData = [
    //     { name: "Users", value: users.filter((user: User) => user.role === "user").length, color: "#8b5cf6" },
    //     { name: "Admins", value: adminUsers, color: "#06b6d4" },
    // ]

    const bookCategoryData = books.reduce((acc: any[], book: Book) => {
        const categoryName = book.category?.name || "Uncategorized"
        const existing = acc.find((item) => item.name === categoryName)
        if (existing) {
            existing.value += 1
        } else {
            acc.push({ name: categoryName, value: 1, color: `#${Math.floor(Math.random() * 16777215).toString(16)}` })
        }
        return acc
    }, [])

    // Monthly revenue data (mock data - you can replace with actual monthly data)
    const monthlyRevenueData = [
        { month: "Jan", revenue: 12 },
        { month: "Feb", revenue: 19 },
        { month: "Mar", revenue: 8 },
        { month: "Apr", revenue: 25 },
        { month: "May", revenue: 22 },
        { month: "Jun", revenue: totalRevenue },
    ]

    // Recent orders for activity feed
    const recentOrders = orders.slice(0, 5)

    const isLoading = ordersLoading || booksLoading || usersLoading || revenueLoading

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading dashboard...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening with your bookstore.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1" />
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1" />
                            {pendingOrders} pending orders
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            <UserCheck className="h-3 w-3 inline mr-1" />
                            {activeUsers} active users
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBooks}</div>
                        <p className="text-xs text-muted-foreground">
                            <Package className="h-3 w-3 inline mr-1" />
                            {inStockBooks} in stock
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={monthlyRevenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Order Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                >
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Book Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>Books by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={bookCategoryData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8b5cf6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* User Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle>User Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Active Users</span>
                                <span>
                                    {activeUsers}/{totalUsers}
                                </span>
                            </div>
                            <Progress value={(activeUsers / totalUsers) * 100} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Admin Users</span>
                                <span>
                                    {adminUsers}/{totalUsers}
                                </span>
                            </div>
                            <Progress value={(adminUsers / totalUsers) * 100} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Blocked Users</span>
                                <span>
                                    {blockedUsers}/{totalUsers}
                                </span>
                            </div>
                            <Progress value={(blockedUsers / totalUsers) * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                                <div className="text-xs text-muted-foreground">Active</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">{blockedUsers}</div>
                                <div className="text-xs text-muted-foreground">Blocked</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity and Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order: Order) => (
                                <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div>
                                            <p className="font-medium">Order #{order._id.slice(-8)}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.products.length} item(s) • {order.transaction.method}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${order.totalPrice}</p>
                                        <Badge
                                            variant={
                                                order.status === "Completed"
                                                    ? "default"
                                                    : order.status === "Pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">Featured Books</span>
                            </div>
                            <span className="font-semibold">{featuredBooks}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-green-500" />
                                <span className="text-sm">In Stock</span>
                            </div>
                            <span className="font-semibold">{inStockBooks}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Out of Stock</span>
                            </div>
                            <span className="font-semibold">{outOfStockBooks}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <UserX className="h-4 w-4 text-orange-500" />
                                <span className="text-sm">Blocked Users</span>
                            </div>
                            <span className="font-semibold">{blockedUsers}</span>
                        </div>

                        <div className="pt-4 border-t">
                            <Button className="w-full" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                View All Reports
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default AdminDashboard

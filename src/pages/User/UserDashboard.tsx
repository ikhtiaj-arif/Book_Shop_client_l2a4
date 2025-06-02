/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { currentUser } from "@/redux/features/auth/authSlice"
import { useGetAllProductsQuery } from "@/redux/features/products/products.api"
import { useAppSelector } from "@/redux/hooks"
import {
    Award,
    BookOpen,
    Calendar,
    Clock,
    Eye,
    Gift,
    Heart,
    ShoppingCart,
    Star,
    Target,
    TrendingUp,
} from "lucide-react"
import type React from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

// Mock API hooks for user-specific data
const useGetUserOrdersQuery = (userId: string) => ({
    data: {
        message: "User orders retrieved successfully",
        status: true,
        data: [
            {
                _id: "683d44986f15da8fff0bad27",
                user: userId,
                products: [
                    {
                        product: "6838019c3428380b1ed49d4d",
                        quantity: 2,
                        _id: "683d44986f15da8fff0bad28",
                    },
                ],
                totalPrice: 171.98,
                status: "Completed",
                createdAt: "2025-06-02T06:28:40.443Z",
                updatedAt: "2025-06-02T07:31:09.026Z",
                transaction: {
                    id: "SP683d449847b7e",
                    method: "Credit Card",
                    bank_status: "Success",
                },
            },
            {
                _id: "683d44986f15da8fff0bad28",
                user: userId,
                products: [
                    {
                        product: "6838019c3428380b1ed49d4d",
                        quantity: 1,
                        _id: "683d44986f15da8fff0bad29",
                    },
                ],
                totalPrice: 85.99,
                status: "Shipped",
                createdAt: "2025-05-28T06:28:40.443Z",
                updatedAt: "2025-05-29T07:31:09.026Z",
                transaction: {
                    id: "SP683d449847b7f",
                    method: "PayPal",
                    bank_status: "Success",
                },
            },
            {
                _id: "683d44986f15da8fff0bad29",
                user: userId,
                products: [
                    {
                        product: "6838019c3428380b1ed49d4d",
                        quantity: 1,
                        _id: "683d44986f15da8fff0bad30",
                    },
                ],
                totalPrice: 85.99,
                status: "Pending",
                createdAt: "2025-06-01T06:28:40.443Z",
                updatedAt: "2025-06-01T07:31:09.026Z",
                transaction: {
                    id: "SP683d449847b7g",
                    method: "Bank Transfer",
                    bank_status: "Pending",
                },
            },
        ],
    },
    isLoading: false,
})

const useGetUserWishlistQuery = (userId: string) => ({
    data: {
        message: "Wishlist retrieved successfully",
        status: true,
        data: [
            {
                _id: "6838019c3428380b1ed49d4d",
                title: "Atomic Habits",
                author: "James Clear",
                price: 85.99,
                originalPrice: 100.99,
                images: "https://i.ibb.co.com/N6S2q4Qg/Screenshot-2021-12-01-141138.png",
                rating: 4.8,
                category: { name: "Self-Help" },
                addedAt: "2025-05-20T06:28:40.443Z",
            },
            {
                _id: "6838019c3428380b1ed49d4e",
                title: "The Psychology of Money",
                author: "Morgan Housel",
                price: 24.99,
                originalPrice: 29.99,
                images: "https://i.ibb.co.com/N6S2q4Qg/Screenshot-2021-12-01-141138.png",
                rating: 4.7,
                category: { name: "Finance" },
                addedAt: "2025-05-18T06:28:40.443Z",
            },
        ],
    },
    isLoading: false,
})

const useGetUserReadingStatsQuery = (userId: string) => ({
    data: {
        message: "Reading stats retrieved successfully",
        status: true,
        data: {
            totalBooksRead: 12,
            totalPagesRead: 3840,
            averageRating: 4.3,
            favoriteGenre: "Self-Help",
            readingStreak: 15,
            monthlyReadingGoal: 4,
            booksReadThisMonth: 3,
            readingTime: 45, // hours
        },
    },
    isLoading: false,
})

// Types
interface UserOrder {
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
        method: string
        bank_status: string
    }
}

interface WishlistItem {
    _id: string
    title: string
    author: string
    price: number
    originalPrice: number
    images: string
    rating: number
    category: { name: string }
    addedAt: string
}

interface ReadingStats {
    totalBooksRead: number
    totalPagesRead: number
    averageRating: number
    favoriteGenre: string
    readingStreak: number
    monthlyReadingGoal: number
    booksReadThisMonth: number
    readingTime: number
}

const UserDashboard: React.FC = () => {
    const user = useAppSelector(currentUser)
    const userId = user?._id || "68358fadc7c4fdcc64dbbc51"

    const { data: userOrdersData, isLoading: ordersLoading } = useGetUserOrdersQuery(userId)
    const { data: wishlistData, isLoading: wishlistLoading } = useGetUserWishlistQuery(userId)
    const { data: readingStatsData, isLoading: statsLoading } = useGetUserReadingStatsQuery(userId)
    const { data: recommendedBooksData, isLoading: recommendedLoading } = useGetAllProductsQuery({ limit: 4 })

    const userOrders = userOrdersData?.data || []
    const wishlistItems = wishlistData?.data || []
    const readingStats = readingStatsData?.data as ReadingStats
    const recommendedBooks = recommendedBooksData?.data || []

    // Calculate user statistics
    const totalSpent = userOrders.reduce((sum: number, order: UserOrder) => sum + order.totalPrice, 0)
    const totalOrders = userOrders.length
    const completedOrders = userOrders.filter((order: UserOrder) => order.status === "Completed").length
    const pendingOrders = userOrders.filter((order: UserOrder) => order.status === "Pending").length

    // Order status distribution
    const orderStatusData = [
        {
            name: "Completed",
            value: userOrders.filter((order: UserOrder) => order.status === "Completed").length,
            color: "#10b981",
        },
        {
            name: "Shipped",
            value: userOrders.filter((order: UserOrder) => order.status === "Shipped").length,
            color: "#3b82f6",
        },
        {
            name: "Pending",
            value: userOrders.filter((order: UserOrder) => order.status === "Pending").length,
            color: "#f59e0b",
        },
        {
            name: "Cancelled",
            value: userOrders.filter((order: UserOrder) => order.status === "Cancelled").length,
            color: "#ef4444",
        },
    ]

    // Monthly spending data (mock data)
    const monthlySpendingData = [
        { month: "Jan", amount: 45.99 },
        { month: "Feb", amount: 67.98 },
        { month: "Mar", amount: 23.99 },
        { month: "Apr", amount: 89.97 },
        { month: "May", amount: 156.95 },
        { month: "Jun", amount: totalSpent },
    ]

    // Reading progress data
    const readingProgressData = [
        { month: "Jan", books: 2 },
        { month: "Feb", books: 3 },
        { month: "Mar", books: 1 },
        { month: "Apr", books: 4 },
        { month: "May", books: 2 },
        { month: "Jun", books: readingStats?.booksReadThisMonth || 0 },
    ]

    const isLoading = ordersLoading || wishlistLoading || statsLoading || recommendedLoading

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading your dashboard...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                            {user?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "Reader"}!</h1>
                        <p className="text-muted-foreground">Here's your reading journey and recent activity</p>
                    </div>
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
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            <TrendingUp className="h-3 w-3 inline mr-1" />
                            Across {totalOrders} orders
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Books Read</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{readingStats?.totalBooksRead || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            <Target className="h-3 w-3 inline mr-1" />
                            {readingStats?.totalPagesRead || 0} pages total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{readingStats?.readingStreak || 0} days</div>
                        <p className="text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {readingStats?.readingTime || 0}h reading time
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{wishlistItems.length}</div>
                        <p className="text-xs text-muted-foreground">
                            <Star className="h-3 w-3 inline mr-1" />
                            Avg rating: {readingStats?.averageRating || 0}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Reading Progress & Monthly Spending */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Reading Progress */}
                <Card>
                    <CardHeader>
                        <CardTitle>Reading Progress</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Goal: {readingStats?.monthlyReadingGoal || 0} books/month</span>
                            <span>This month: {readingStats?.booksReadThisMonth || 0}</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Monthly Progress</span>
                                <span>
                                    {readingStats?.booksReadThisMonth || 0}/{readingStats?.monthlyReadingGoal || 0}
                                </span>
                            </div>
                            <Progress
                                value={((readingStats?.booksReadThisMonth || 0) / (readingStats?.monthlyReadingGoal || 1)) * 100}
                                className="h-2"
                            />
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={readingProgressData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${value} books`, "Books Read"]} />
                                <Line type="monotone" dataKey="books" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Monthly Spending */}
                <Card>
                    <CardHeader>
                        <CardTitle>Spending Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={monthlySpendingData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value}`, "Amount Spent"]} />
                                <Bar dataKey="amount" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Order Status & Wishlist */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={orderStatusData.filter((item) => item.value > 0)}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
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

                {/* Recent Orders */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Recent Orders
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View All
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {userOrders.slice(0, 3).map((order: UserOrder) => (
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
                                        <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
                                        <Badge
                                            variant={
                                                order.status === "Completed" ? "default" : order.status === "Pending" ? "secondary" : "outline"
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
            </div>

            {/* Wishlist & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Wishlist */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                My Wishlist
                            </span>
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {wishlistItems.slice(0, 3).map((item: WishlistItem) => (
                                <div key={item._id} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <img
                                        src={item.images || "/placeholder.svg"}
                                        alt={item.title}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.author}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-semibold">${item.price}</span>
                                            {item.originalPrice > item.price && (
                                                <span className="text-xs text-muted-foreground line-through">${item.originalPrice}</span>
                                            )}
                                            <Badge variant="outline" className="text-xs">
                                                {item.category.name}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gift className="h-5 w-5" />
                            Recommended for You
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recommendedBooks.slice(0, 3).map((book: any) => (
                                <div key={book._id} className="flex items-center gap-3 p-3 border rounded-lg">
                                    <img
                                        src={book.images || "/placeholder.svg?height=64&width=48"}
                                        alt={book.title}
                                        className="w-12 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium line-clamp-1">{book.title}</h4>
                                        <p className="text-sm text-muted-foreground">{book.author}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-semibold">${book.price}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs">{book.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        Add to Cart
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reading Stats Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Reading Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{readingStats?.totalBooksRead || 0}</div>
                            <div className="text-sm text-muted-foreground">Books Read</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{readingStats?.totalPagesRead || 0}</div>
                            <div className="text-sm text-muted-foreground">Pages Read</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{readingStats?.favoriteGenre || "N/A"}</div>
                            <div className="text-sm text-muted-foreground">Favorite Genre</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-600">{readingStats?.averageRating || 0}</div>
                            <div className="text-sm text-muted-foreground">Avg Rating</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDashboard

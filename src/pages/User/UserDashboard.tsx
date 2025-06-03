/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { currentUser } from "@/redux/features/auth/authSlice"
import { useViewOrdersQuery } from "@/redux/features/orders/order.api"
import { useGetAllProductsQuery } from "@/redux/features/products/products.api"
import { useAppSelector } from "@/redux/hooks"
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Gift,
  Heart,
  Package,
  ShoppingCart,
  Star,
  Target,
  TrendingUp,
} from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
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

// Mock API hooks for user-specific data that we don't have real endpoints for yet

const useGetUserWishlistQuery = () => ({
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

const useGetUserReadingStatsQuery = () => ({
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
interface Product {
  product: {
    _id: string
    title: string
    author: string
    description: string
    price: number
    originalPrice: number
    isbn: string
    publisher: string
    publishedDate: string
    language: string
    pages: number
    format: string
    dimensions: string
    weight: string
    images: string
    rating: number
    reviewCount: number
    inStock: boolean
    stockQuantity: number
    tags: string[]
    featured: boolean
    bestseller: boolean
    newArrival: boolean
    discount: number
    category: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  quantity: number
  _id: string
}

interface BillingAddress {
  address: string
  city: string
  country: string
  state: string
  zipCode: string
}

interface Transaction {
  id: string
  transactionStatus: string
}

interface Order {
  _id: string
  user: string
  products: Product[]
  totalPrice: number
  status: string
  createdAt: string
  updatedAt: string
  billingAddress: BillingAddress
  transaction: Transaction
  __v: number
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
  const userId = user?.id || ""
  const navigate = useNavigate()

  const { data: userOrdersData, isLoading: ordersLoading } = useViewOrdersQuery(userId)
  const { data: wishlistData, isLoading: wishlistLoading } = useGetUserWishlistQuery()
  const { data: readingStatsData, isLoading: statsLoading } = useGetUserReadingStatsQuery()
  const { data: recommendedBooksData, isLoading: recommendedLoading } = useGetAllProductsQuery({ limit: 4 })

  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "year">("month")

  const userOrders = userOrdersData?.data || []
  const wishlistItems = wishlistData?.data || []
  const readingStats = readingStatsData?.data as ReadingStats
  const recommendedBooks = recommendedBooksData?.data || []

  // Calculate user statistics
  const totalSpent = useMemo(
    () => userOrders.reduce((sum: number, order: Order) => sum + order.totalPrice, 0),
    [userOrders],
  )

  const totalOrders = userOrders.length
  // const completedOrders = userOrders.filter((order: Order) => order.status === "Completed").length
  // const pendingOrders = userOrders.filter((order: Order) => order.status === "Pending").length

  // Order status distribution
  const orderStatusData = useMemo(
    () => [
      {
        name: "Completed",
        value: userOrders.filter((order: Order) => order.status === "Completed").length,
        color: "#10b981",
      },
      {
        name: "Shipped",
        value: userOrders.filter((order: Order) => order.status === "Shipped").length,
        color: "#3b82f6",
      },
      {
        name: "Pending",
        value: userOrders.filter((order: Order) => order.status === "Pending").length,
        color: "#f59e0b",
      },
      {
        name: "Cancelled",
        value: userOrders.filter((order: Order) => order.status === "Cancelled").length,
        color: "#ef4444",
      },
    ],
    [userOrders],
  )

  // Generate monthly spending data from actual orders
  const monthlySpendingData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentYear = new Date().getFullYear()

    // Initialize with zero amounts
    const monthlyData = months.map((month) => ({ month, amount: 0 }))

    // Fill in actual order data
    userOrders.forEach((order: Order) => {
      const orderDate = new Date(order.createdAt)
      if (orderDate.getFullYear() === currentYear) {
        const monthIndex = orderDate.getMonth()
        monthlyData[monthIndex].amount += order.totalPrice
      }
    })

    return monthlyData
  }, [userOrders])

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

  // Handle case where user is not logged in
  if (!userId) {
    return (
      <div className="container mx-auto p-6 text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
        <Button onClick={() => navigate("/login")}>Log In</Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            <AvatarImage src={"/placeholder.svg"} />
            {/* <AvatarImage src={user?.avatar || "/placeholder.svg"} /> */}
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
                  {readingStats?.booksReadThisMonth || 0}/{readingStats?.monthlyReadingGoal || 1}
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
            <div className="flex gap-2">
              <Button
                variant={selectedTimeframe === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("month")}
              >
                Monthly
              </Button>
              <Button
                variant={selectedTimeframe === "year" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe("year")}
              >
                Yearly
              </Button>
            </div>
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

      {/* Order Status & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {userOrders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Orders
              <Button variant="outline" size="sm" onClick={() => navigate("/my-orders")}>
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                <Button onClick={() => navigate("/books")}>Browse Books</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.slice(0, 3).map((order: Order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-medium">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.products.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.totalPrice.toFixed(2)}</p>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Pending"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate("/my-orders")}>
                  View All Orders
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
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

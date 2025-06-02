

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { currentUser } from "@/redux/features/auth/authSlice"
import { useViewOrdersQuery } from "@/redux/features/orders/order.api"
import { useAppSelector } from "@/redux/hooks"
import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  CreditCard,
  Eye,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react"
import type React from "react"
import { useState } from "react"

// Define types for the order data
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

interface OrderDetailsProps {
  order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono text-sm">{order._id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge
                variant={
                  order.status === "Completed"
                    ? "default"
                    : order.status === "Pending"
                      ? "secondary"
                      : order.status === "Cancelled"
                        ? "destructive"
                        : "outline"
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Price:</span>
              <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date:</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-mono text-sm">{order.transaction.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Status:</span>
              <Badge
                variant={
                  order.transaction.transactionStatus === "Completed"
                    ? "default"
                    : order.transaction.transactionStatus === "Initiated"
                      ? "secondary"
                      : "outline"
                }
              >
                {order.transaction.transactionStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Billing Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p>{order.billingAddress.address}</p>
            <p>
              {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
            </p>
            <p>{order.billingAddress.country}</p>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products ({order.products.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.products.map((item) => (
              <div key={item._id} className="flex gap-4 border rounded-lg p-4">
                <img
                  src={item.product.images || "/placeholder.svg?height=80&width=60"}
                  alt={item.product.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.product.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.product.author}</p>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <p className="text-sm">
                        Format: <span className="font-medium">{item.product.format}</span>
                      </p>
                      <p className="text-sm">
                        Quantity: <span className="font-medium">{item.quantity}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.product.price.toFixed(2)}</p>
                      {item.product.originalPrice > item.product.price && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const MyOrdersPage: React.FC = () => {
  const user = useAppSelector(currentUser)
  const userId = user?.id

  const { data: ordersData, isLoading, error } = useViewOrdersQuery(userId || "")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Handle case where user is not logged in
  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your orders</h1>
        <Button onClick={() => (window.location.href = "/login")}>Log In</Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Error loading orders</h1>
        <p className="text-muted-foreground">Please try again later</p>
      </div>
    )
  }

  const orders = ordersData?.data || []

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order: Order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Pagination
  const ordersPerPage = 5
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "shipped":
        return <Package className="h-5 w-5 text-blue-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your order history</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by Order ID or Transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders found</h2>
          <p className="text-muted-foreground mb-6">
            {orders.length === 0 ? "You haven't placed any orders yet." : "No orders match your search criteria."}
          </p>
          <Button onClick={() => (window.location.href = "/books")}>Browse Books</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Desktop View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order: Order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-mono text-sm">{order._id.slice(-8)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{order.products.length}</TableCell>
                    <TableCell className="font-semibold">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <Badge
                          variant={
                            order.status === "Completed"
                              ? "default"
                              : order.status === "Pending"
                                ? "secondary"
                                : order.status === "Cancelled"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline">{order.transaction.transactionStatus}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(order)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {paginatedOrders.map((order: Order) => (
              <Card key={order._id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-mono text-sm">#{order._id.slice(-8)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge
                      variant={
                        order.status === "Completed"
                          ? "default"
                          : order.status === "Pending"
                            ? "secondary"
                            : order.status === "Cancelled"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items:</span>
                      <span>{order.products.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment:</span>
                      <span>{order.transaction.transactionStatus}</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline" onClick={() => handleViewDetails(order)}>
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                    if (pageNum <= totalPages) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(pageNum)
                            }}
                            isActive={currentPage === pageNum}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }
                    return null
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MyOrdersPage

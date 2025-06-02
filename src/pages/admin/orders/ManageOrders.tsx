

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "@/redux/features/orders/order.api"
import {
    Calendar,
    DollarSign,
    Edit,
    Eye,
    MapPin,
    MoreVertical,
    Package,
    Search,
    ShoppingCart,
    Users
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

// Define types for the order data
interface BillingAddress {
    address: string
    city: string
    country: string
    state: string
    zipCode: string
}

interface Transaction {
    id: string
    bank_status: string
}

interface Product {
    product: string
    quantity: number
    _id: string
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
type OrderStatus = "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled"

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
                                    order.status === "Completed" ? "default" : order.status === "Pending" ? "secondary" : "destructive"
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
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">User ID:</span>
                            <span className="font-mono text-sm">{order.user}</span>
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
                            <Badge variant={order.transaction.bank_status === "Success" ? "default" : "secondary"}>
                                {order.transaction.bank_status}
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
                    <div className="space-y-3">
                        {order.products.map((product) => (
                            <div key={product._id} className="flex justify-between items-center p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">Product ID: {product.product}</p>
                                    <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    View Product
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ManageOrders() {
    const { data: orderData, isLoading, refetch } = useGetOrdersQuery(undefined)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation()
    const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false)
    const [selectedOrderForUpdate, setSelectedOrderForUpdate] = useState<Order | null>(null)
    const [newStatus, setNewStatus] = useState<OrderStatus>("Pending")


    const orders = orderData?.data || []

    // Filter orders based on search and filters
    const filteredOrders = orders.filter((order: Order) => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "All" || order.status === statusFilter
        const matchesPaymentStatus =
            paymentStatusFilter === "All" || order.transaction.bank_status === paymentStatusFilter

        return matchesSearch && matchesStatus && matchesPaymentStatus
    })

    // Pagination
    const itemsPerPage = 10
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

    // Calculate statistics
    const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.totalPrice, 0)
    const pendingOrders = orders.filter((order: Order) => order.status === "Pending").length
    const completedOrders = orders.filter((order: Order) => order.status === "Completed").length

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order)
        setIsDetailsOpen(true)
    }

    const handleUpdateStatus = async () => {
        if (!selectedOrderForUpdate) return

        try {
            await updateOrderStatus({
                id: selectedOrderForUpdate._id,
                status: newStatus,
            }).unwrap()

            toast.success("Order status updated successfully!")
            setIsStatusUpdateOpen(false)
            setSelectedOrderForUpdate(null)
            refetch() // Refetch the orders data
        } catch (error) {
            toast.error("Failed to update order status")
            console.error("Error updating order status:", error)
        }
    }

    const handleOpenStatusUpdate = (order: Order) => {
        setSelectedOrderForUpdate(order)
        setNewStatus(order.status as OrderStatus)
        setIsStatusUpdateOpen(true)
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Completed":
                return "default"
            case "Paid":
                return "default"
            case "Shipped":
                return "secondary"
            case "Pending":
                return "secondary"
            case "Cancelled":
                return "destructive"
            default:
                return "outline"
        }
    }

    const getPaymentStatusVariant = (status: string) => {
        switch (status) {
            case "Completed":
                return "default"
            case "Initiated":
                return "secondary"
            case "Failed":
                return "destructive"
            default:
                return "outline"
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading orders...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
                    <p className="text-muted-foreground">View and manage all customer orders</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{orders.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by Order ID, User ID, or Transaction ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Statuses</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Payments</SelectItem>
                                <SelectItem value="Initiated">Initiated</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>User ID</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead>Order Status</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead>Order Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedOrders.map((order: Order) => (
                                        <TableRow key={order._id}>
                                            <TableCell className="font-mono text-sm">{order._id.slice(-8)}</TableCell>
                                            <TableCell className="font-mono text-sm">{order.user.slice(-8)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-4 w-4" />
                                                    <span>{order.products.length} item(s)</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-semibold">${order.totalPrice.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getPaymentStatusVariant(order.transaction.bank_status)}>
                                                    {order.transaction.bank_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleOpenStatusUpdate(order)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Update Status
                                                        </DropdownMenuItem>
                                                        {/* <DropdownMenuItem>
                                                            <CreditCard className="h-4 w-4 mr-2" />
                                                            View Transaction
                                                        </DropdownMenuItem> */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
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

            {/* Order Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && <OrderDetails order={selectedOrder} />}
                </DialogContent>
            </Dialog>
            {/* Status Update Dialog */}
            <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                    </DialogHeader>
                    {selectedOrderForUpdate && (
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Order ID:</p>
                                <p className="font-mono text-sm">{selectedOrderForUpdate._id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Current Status:</p>
                                <Badge variant={getStatusVariant(selectedOrderForUpdate.status)}>{selectedOrderForUpdate.status}</Badge>
                            </div>

                            <div>
                                <Label htmlFor="status-select" className="mb-1">New Status:</Label>
                                <Select value={newStatus} onValueChange={(value: OrderStatus) => setNewStatus(value)}>
                                    <SelectTrigger id="status-select">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                        <SelectItem value="Paid">Paid</SelectItem>
                                        <SelectItem value="Shipped">Shipped</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={handleUpdateStatus}
                                    disabled={isUpdating || newStatus === selectedOrderForUpdate.status}
                                    className="flex-1"
                                >
                                    {isUpdating ? "Updating..." : "Update Status"}
                                </Button>
                                <Button variant="outline" onClick={() => setIsStatusUpdateOpen(false)} className="flex-1">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

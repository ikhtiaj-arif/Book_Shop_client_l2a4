"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { clearCart } from "@/redux/features/cart/cartSlice"
import { useVerifyOrderQuery } from "@/redux/features/orders/order.api"
import { useAppDispatch } from "@/redux/hooks"
import { CheckCircle, CreditCard, Home, Loader2, Package, Receipt, ShoppingBag, XCircle } from "lucide-react"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

const VerifyOrder = () => {
    const dispatch = useAppDispatch()
    const [params] = useSearchParams()
    const { data, isLoading } = useVerifyOrderQuery(params.get("order_id"))
    const order = data?.data?.[0]

    useEffect(() => {
        if (order?.bank_status === "Success") dispatch(clearCart())
    }, [order?.bank_status, dispatch])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Verifying Your Order</h2>
                        <p className="text-muted-foreground text-center">Please wait while we confirm your payment...</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const isSuccess = order?.bank_status === "Success"

    return (
        <div className="min-h-screen bg-muted/30 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        {isSuccess ? (
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                        ) : (
                            <div className="rounded-full bg-red-100 p-3">
                                <XCircle className="h-12 w-12 text-red-600" />
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        {isSuccess ? "Order Confirmed!" : "Payment Failed"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isSuccess
                            ? "Thank you for your purchase. Your order has been successfully processed."
                            : "There was an issue processing your payment. Please try again."}
                    </p>
                </div>

                {/* Order Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Payment Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Receipt className="h-5 w-5" />
                                Payment Summary
                            </CardTitle>
                            <CardDescription>Details of your transaction</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Order Amount:</span>
                                <span className="font-semibold">${order?.amount}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Total Payable:</span>
                                <span className="text-lg font-bold">${order?.payable_amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Payment Status:</span>
                                <Badge variant={isSuccess ? "default" : "destructive"} className="flex items-center gap-1">
                                    {isSuccess ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                    {order?.bank_status}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Order Information
                            </CardTitle>
                            <CardDescription>Your order details and next steps</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Order ID:</span>
                                <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                    {params.get("order_id")?.slice(-8) || "N/A"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Payment Method:</span>
                                <div className="flex items-center gap-1">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Online Payment</span>
                                </div>
                            </div>
                            <Separator />
                            {isSuccess ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-green-800 mb-1">Payment Successful</h4>
                                            <p className="text-sm text-green-700">
                                                Your order has been confirmed and will be processed shortly. You'll receive an email
                                                confirmation with tracking details.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-red-800 mb-1">Payment Failed</h4>
                                            <p className="text-sm text-red-700">
                                                Your payment could not be processed. Please check your payment details and try again.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <Card className="mt-8">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {isSuccess ? (
                                <>
                                    <Button asChild size="lg" className="w-full sm:w-auto">
                                        <Link to="/my-orders" className="flex items-center gap-2">
                                            <ShoppingBag className="h-4 w-4" />
                                            View My Orders
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                                        <Link to="/" className="flex items-center gap-2">
                                            <Home className="h-4 w-4" />
                                            Continue Shopping
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button asChild size="lg" className="w-full sm:w-auto">
                                        <Link to="/checkout" className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            Try Again
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                                        <Link to="/" className="flex items-center gap-2">
                                            <Home className="h-4 w-4" />
                                            Back to Home
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                {isSuccess && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">What's Next?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-blue-100 p-2">
                                        <Package className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Order Processing</h4>
                                        <p className="text-sm text-muted-foreground">Your order is being prepared for shipment</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-green-100 p-2">
                                        <Receipt className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email Confirmation</h4>
                                        <p className="text-sm text-muted-foreground">Check your email for order details</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-purple-100 p-2">
                                        <ShoppingBag className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Track Your Order</h4>
                                        <p className="text-sm text-muted-foreground">Monitor your order status online</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default VerifyOrder

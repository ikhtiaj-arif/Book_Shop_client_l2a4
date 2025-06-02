"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { currentUser } from "@/redux/features/auth/authSlice"
import { clearCart, removeFromCart, updateQuantity, useCurrentCartProduct } from "@/redux/features/cart/cartSlice"
import { useCreateOrderMutation } from "@/redux/features/orders/order.api"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { processCart } from "@/utils/CartGenerator"
import { ArrowLeft, Minus, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface CheckoutCartItemProps {
    item: {
        _id: string
        title: string
        author: string
        price: number
        originalPrice?: number
        format: string
        images: string
        stockQuantity: number
        orderQuantity: number
        discount?: number
    }
    onUpdateQuantity: (id: string, quantity: number) => void
    onRemove: (id: string) => void
}

const CheckoutCartItem: React.FC<CheckoutCartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex gap-4 py-4">
            <img
                src={item.images || "/placeholder.svg?height=80&width=60"}
                alt={item.title}
                className="w-16 h-20 object-cover rounded"
            />
            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                        <p className="text-xs text-muted-foreground">{item.format}</p>
                        {item.discount && (
                            <Badge variant="destructive" className="text-xs mt-1">
                                {item.discount}% OFF
                            </Badge>
                        )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => onRemove(item._id)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item._id, Math.max(1, item.orderQuantity - 1))}
                            disabled={item.orderQuantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.orderQuantity}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item._id, item.orderQuantity + 1)}
                            disabled={item.orderQuantity >= item.stockQuantity}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="text-right">
                        <div className="font-semibold">${(item.price * item.orderQuantity).toFixed(2)}</div>
                        {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-xs text-muted-foreground line-through">
                                ${(item.originalPrice * item.orderQuantity).toFixed(2)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckoutPage: React.FC = () => {
    // Use the actual Redux hooks and selectors
    const cart = useAppSelector(useCurrentCartProduct)
    const user = useAppSelector(currentUser)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation()

    const [billingAddress, setBillingAddress] = useState({
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
    })
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    const toastId = "checkout"

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }))
        toast.success("Cart updated!", { id: toastId })
    }

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id))
        toast.error("Item removed from cart!", { id: toastId })
    }

    const handleInputChange = (field: string, value: string) => {
        setBillingAddress((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleConfirmOrder = async () => {
        if (!agreeToTerms) {
            toast.error("You must agree to the terms and conditions.", { id: toastId })
            return
        }

        // Validate billing address
        const requiredFields = ["address", "city", "state", "zipCode", "country"]
        const missingFields = requiredFields.filter((field) => !billingAddress[field as keyof typeof billingAddress])

        if (missingFields.length > 0) {
            toast.error("Please fill in all required fields.", { id: toastId })
            return
        }

        try {
            const processedCart = await processCart(cart, user?.email)
            await createOrder({ products: processedCart, billingAddress })
        } catch (error) {
            toast.error("Failed to place order. Please try again.", { id: toastId })
        }
    }

    // Handle order status changes
    useEffect(() => {
        if (isLoading) toast.loading("Processing your order...", { id: toastId })
        if (isSuccess) {
            toast.success("Order placed successfully!", { id: toastId })
            // Clear the cart after successful order
            dispatch(clearCart())
            if (data?.data) {
                setTimeout(() => {
                    window.location.href = data.data
                }, 1000)
            }
        }
        if (isError) toast.error(JSON.stringify(error), { id: toastId })
    }, [data, error, isError, isLoading, isSuccess, dispatch])

    const subtotal = cart.reduce((total, item) => total + item.price * item.orderQuantity, 0)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99 // Free shipping over $50
    const total = subtotal + tax + shipping

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                    <p className="text-muted-foreground">Add some books to get started!</p>
                    <Button onClick={() => navigate("/books")}>Browse Books</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-muted-foreground">Complete your order below</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Billing Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Billing Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="address">Address *</Label>
                                <Input
                                    id="address"
                                    placeholder="123 Main St"
                                    value={billingAddress.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">City *</Label>
                                    <Input
                                        id="city"
                                        placeholder="New York"
                                        value={billingAddress.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state">State *</Label>
                                    <Input
                                        id="state"
                                        placeholder="NY"
                                        value={billingAddress.state}
                                        onChange={(e) => handleInputChange("state", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="zipCode">Zip Code *</Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="10001"
                                        value={billingAddress.zipCode}
                                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="country">Country *</Label>
                                    <Input
                                        id="country"
                                        placeholder="USA"
                                        value={billingAddress.country}
                                        onChange={(e) => handleInputChange("country", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={agreeToTerms}
                                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                                />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the{" "}
                                    <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        terms and conditions
                                    </a>
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Cart Items */}
                                <div className="max-h-80 overflow-y-auto">
                                    {cart.map((item, index) => (
                                        <div key={item._id}>
                                            <CheckoutCartItem
                                                item={item}
                                                onUpdateQuantity={handleUpdateQuantity}
                                                onRemove={handleRemoveItem}
                                            />
                                            {index < cart.length - 1 && <Separator />}
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Order Totals */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 pt-4">
                                    <Button
                                        onClick={handleConfirmOrder}
                                        className="w-full"
                                        size="lg"
                                        disabled={isLoading || !agreeToTerms}
                                    >
                                        {isLoading ? "Processing..." : "Confirm Order"}
                                    </Button>
                                    <Button onClick={() => navigate("/books")} variant="outline" className="w-full" size="lg">
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage

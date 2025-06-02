
import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { removeFromCart, updateQuantity, useCurrentCartProduct } from "@/redux/features/cart/cartSlice"
import { currentUser } from "@/redux/features/auth/authSlice"

interface CartItemProps {
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

const CartItemComponent: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Card className="mb-4 mx-4">
      <CardContent className="p">
        <div className="flex gap-4">
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
      </CardContent>
    </Card>
  )
}

const CartButton: React.FC = () => {
  // Use the actual Redux hooks and selectors
  const cart = useAppSelector(useCurrentCartProduct)
  const user = useAppSelector(currentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toastId = "cart"

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
    toast.success("Cart updated!", { id: toastId })
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id))
    toast.error("Item removed from cart!", { id: toastId })
  }

  const handleOpenCheckout = () => {
    if (user && user?.email) {
      setIsOpen(false)
      navigate("/checkout")
    } else {
      toast.error("You need to login first!", { id: toastId })
      setIsOpen(false)
      navigate("/login")
    }
  }

  const handleContinueShopping = () => {
    setIsOpen(false)
    navigate("/books")
  }

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.orderQuantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full  sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left">Shopping Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[86vh]">
          {cart.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <CartItemComponent
                    key={item._id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 mt-4 mx-6 space-y-4" >
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button onClick={handleOpenCheckout} className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  <Button onClick={handleContinueShopping} variant="outline" className="w-full" size="lg">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some books to get started!</p>
              </div>
              <Button onClick={handleContinueShopping} className="w-full">
                Browse Books
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartButton

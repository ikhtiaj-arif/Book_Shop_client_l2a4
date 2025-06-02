/* eslint-disable @typescript-eslint/no-unused-vars */

import { currentUser } from "@/redux/features/auth/authSlice"
import { addToCart } from "@/redux/features/cart/cartSlice"
import { useGetBookByIdQuery } from "@/redux/features/products/products.api"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import QuantitySelector from "@/utils/QuantitySelector"
import { ArrowLeft, Heart, RotateCcw, Share2, Shield, ShoppingCart, Star, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

// Mock data - replace with API call later
const book = {
  id: 1,
  title: "The Midnight Library",
  author: "Matt Haig",
  price: 24.99,
  originalPrice: 29.99,
  rating: 4.8,
  reviews: 1247,
  images: [
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
    "/placeholder.svg?height=600&width=400",
  ],
  category: "Fiction",
  publishYear: 2020,
  pages: 288,
  language: "English",
  isbn: "978-0525559474",
  publisher: "Viking",
  inStock: true,
  stockCount: 15,
  description: `Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?`,
  features: [
    "New York Times Bestseller",
    "Over 1 million copies sold",
    "Translated into 35 languages",
    "Winner of the Goodreads Choice Award",
  ],
}

const relatedBooks = [
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 19.99,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=200",
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review: "Absolutely beautiful and thought-provoking. This book made me reflect on my own life choices.",
    date: "2 days ago",
    helpful: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    review: "A unique concept executed brilliantly. Matt Haig's writing is both philosophical and accessible.",
    date: "1 week ago",
    helpful: 8,
  },
]

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(currentUser)
  // Local state
  const [selectedImage, setSelectedImage] = useState(0)

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
  })

  // API queries
  const { data: bookData, isLoading: isBookLoading, error: bookError } = useGetBookByIdQuery(id!, { skip: !id })

  const book = bookData?.data

  // const book = book?.data
  console.log("BOok", id, bookData);
  //!for future updates
  //   const {
  //   data: reviewsData,
  //   isLoading: isReviewsLoading,
  //   refetch: refetchReviews,
  // } = useGetBookReviewsQuery({ bookId: id! }, { skip: !id })
  // const { data: relatedBooksData } = useGetRelatedBooksQuery({ bookId: id! }, { skip: !id })

  // // Mutations
  // const [addToWishlist] = useAddToWishlistMutation()
  // const [removeFromWishlist] = useRemoveFromWishlistMutation()
  // const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation()
  // const [markHelpful] = useMarkReviewHelpfulMutation()

  //cart
  const cart = useAppSelector((state) => state.cart.items);
  const currentCartItem = cart.find(item => item._id === book?._id)

  console.log("currentCartItem", currentCartItem);

  useEffect(() => {
    if (currentCartItem) setSelectedQuantity(currentCartItem?.orderQuantity as number)
  }, [currentCartItem?.orderQuantity, currentCartItem])

  // const handleBuyNow = () => {
  //   // Add the product to the cart with selected quantity
  //   dispatch(addToCart({
  //     product: book,
  //     uantity: selectedQuantity,
  //   }));

  //   // Encrypt product info
  //   const encryptedData = CryptoJS.AES.encrypt(
  //     JSON.stringify(product),
  //     'secret_key' // Use a secure key here
  //   ).toString();

  //   // Save encrypted data to localStorage
  //   localStorage.setItem('checkoutProduct', encryptedData);

  //   // Navigate to the checkout page
  //   navigate(`/checkout`);
  // };

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: book,
      quantity: selectedQuantity,
    }));
  };



  if (isBookLoading) return <>loading</>
  else {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/books" className="hover:text-primary">
              Books
            </Link>
            <span>/</span>
            <Link to="/books?category=Fiction" className="hover:text-primary">
              Fiction
            </Link>
            <span>/</span>
            <span className="text-foreground">{book.title}</span>
          </div>
        </div>

        <Button variant="ghost" asChild className="mb-6">
          <Link to="/books">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={book.images || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-[70vh] object-cover"
              />
            </div>
            {/* <div className="flex gap-2">
              {book.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] w-20 overflow-hidden rounded-md border-2 ${selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {book.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {/* <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(book.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div> */}
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-muted-foreground">({book.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${book.price}</span>
                {book.originalPrice > book.price && (
                  <span className="text-xl text-muted-foreground line-through">${book.originalPrice}</span>
                )}
                {book.originalPrice > book.price && (
                  <Badge variant="destructive">Save ${(book.originalPrice - book.price).toFixed(2)}</Badge>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                {/* <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded-md px-3 py-2"
                >
                  {[...Array(Math.min(10, book.stockCount))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select> */}
                <span className="text-sm text-muted-foreground">{book.stockCount} in stock</span>
              </div>
              <div className="mb-4">



                <QuantitySelector
                  className='w-24'
                  quantity={selectedQuantity}
                  maxQuantity={book.stockQuantity}
                  onIncrease={() => setSelectedQuantity((prev) => Math.min(prev + 1, book.stockQuantity))}
                  onDecrease={() => setSelectedQuantity((prev) => Math.max(prev - 1, 1))}
                  onChange={(value) => setSelectedQuantity(value)}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Free Shipping</div>
                <div className="text-xs text-muted-foreground">On orders over $35</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Secure Payment</div>
                <div className="text-xs text-muted-foreground">100% protected</div>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-sm font-medium">Easy Returns</div>
                <div className="text-xs text-muted-foreground">30-day policy</div>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Book Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Publisher: {book.publisher}</div>
                <div>Pages: {book.pages}</div>
                <div>Language: {book.language}</div>
                <div>Year: {book.publishYear}</div>
                <div className="col-span-2">ISBN: {book.isbn}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({book.reviews})</TabsTrigger>
              <TabsTrigger value="details">Additional Details</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-lg leading-relaxed">{book.description}</p>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    {/* <ul className="space-y-2">
                      {book.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul> */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{review.name}</span>
                            {/* <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div> */}
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="mb-3">{review.review}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <button className="hover:text-primary">Helpful ({review.helpful})</button>
                            <button className="hover:text-primary">Reply</button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Publication Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Publisher:</span>
                          <span>{book.publisher}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Publication Year:</span>
                          <span>{book.publishYear}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Language:</span>
                          <span>{book.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pages:</span>
                          <span>{book.pages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ISBN:</span>
                          <span>{book.isbn}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Shipping & Returns</h4>
                      <div className="space-y-2 text-sm">
                        <div>• Free shipping on orders over $35</div>
                        <div>• Standard delivery: 3-5 business days</div>
                        <div>• Express delivery: 1-2 business days</div>
                        <div>• 30-day return policy</div>
                        <div>• Books must be in original condition</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Books */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="font-semibold line-clamp-2 mb-2">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${book.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

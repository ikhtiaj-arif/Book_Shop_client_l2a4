"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Star, ArrowRight, BookOpen, Users, Award, Truck, Shield, HeartHandshake } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

// Mock data - replace with API calls later
const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=300&width=200",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviews: 2156,
    image: "/placeholder.svg?height=300&width=200",
    badge: "Popular",
  },
  {
    id: 3,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 16.99,
    originalPrice: 21.99,
    rating: 4.7,
    reviews: 987,
    image: "/placeholder.svg?height=300&width=200",
    badge: "New Release",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.6,
    reviews: 3421,
    image: "/placeholder.svg?height=300&width=200",
    badge: "Classic",
  },
]

const categories = [
  { name: "Fiction", count: 1250, image: "/placeholder.svg?height=200&width=300" },
  { name: "Non-Fiction", count: 890, image: "/placeholder.svg?height=200&width=300" },
  { name: "Mystery & Thriller", count: 567, image: "/placeholder.svg?height=200&width=300" },
  { name: "Romance", count: 432, image: "/placeholder.svg?height=200&width=300" },
  { name: "Science Fiction", count: 321, image: "/placeholder.svg?height=200&width=300" },
  { name: "Children's Books", count: 678, image: "/placeholder.svg?height=200&width=300" },
]

const customerReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review: "Amazing selection of books and super fast delivery! I've been a customer for over 2 years now.",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    review: "Best prices I've found online. The book recommendations are spot on!",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    review: "Great customer service and the books always arrive in perfect condition.",
    date: "2 weeks ago",
  },
]

const stats = [
  { icon: BookOpen, label: "Books Available", value: "50,000+" },
  { icon: Users, label: "Happy Customers", value: "25,000+" },
  { icon: Award, label: "Years in Business", value: "15+" },
  { icon: Truck, label: "Countries Served", value: "30+" },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $35",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: HeartHandshake,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
]

export default function HomePage() {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % customerReviews.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  📚 Over 50,000 Books Available
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Discover Your Next
                  <span className="text-primary"> Great Read</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  From bestsellers to hidden gems, find the perfect book for every mood and moment. Fast delivery, great
                  prices, and endless stories await.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/books">
                    Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/categories">Explore Categories</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9/5 from 10k+ reviews</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {featuredBooks.slice(0, 4).map((book, index) => (
                  <Card
                    key={book.id}
                    className={`transform transition-all duration-300 hover:scale-105 ${
                      index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
                    }`}
                  >
                    <CardContent className="p-4">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                      <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm">${book.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{book.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Books</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our bestsellers and new arrivals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      className="w-full h-64 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2">{book.badge}</Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{book.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({book.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${book.price}</span>
                        <span className="text-sm text-muted-foreground line-through">${book.originalPrice}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/books/${book.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/books">
                View All Books <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your favorite genres and discover new ones
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-t-lg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="font-bold text-lg">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} books</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join thousands of satisfied book lovers</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < customerReviews[currentReview].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="text-xl mb-6">"{customerReviews[currentReview].review}"</blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar>
                    <AvatarImage src={customerReviews[currentReview].avatar || "/placeholder.svg"} />
                    <AvatarFallback>{customerReviews[currentReview].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold">{customerReviews[currentReview].name}</div>
                    <div className="text-sm text-muted-foreground">{customerReviews[currentReview].date}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center gap-2 mt-6">
              {customerReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentReview ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Get the latest book recommendations and exclusive offers delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md text-foreground"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Filter, Grid, List, Star, Heart } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Checkbox } from "../components/ui/checkbox"
import { Slider } from "../components/ui/slider"

// Mock data - replace with API calls later
const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 1247,
    image: "/placeholder.svg?height=300&width=200",
    category: "Fiction",
    publishYear: 2020,
    inStock: true,
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
    category: "Self-Help",
    publishYear: 2018,
    inStock: true,
  },
  // Add more books...
]

const categories = ["All", "Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Self-Help"]
const authors = ["All", "Matt Haig", "James Clear", "Taylor Jenkins Reid", "Frank Herbert"]

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedAuthor, setSelectedAuthor] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    const matchesAuthor = selectedAuthor === "All" || book.author === selectedAuthor
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesAuthor && matchesPrice
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Books</h1>
        <p className="text-muted-foreground">
          Discover your next great read from our collection of {books.length} books
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={() => setSelectedCategory(category)}
                      />
                      <label htmlFor={category} className="text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Author</h3>
                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author} value={author}>
                        {author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label htmlFor="in-stock" className="text-sm">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" />
                    <label htmlFor="on-sale" className="text-sm">
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {filteredBooks.length} of {books.length} books
        </p>
      </div>

      {/* Books Grid/List */}
      <div
        className={
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
        }
      >
        {filteredBooks.map((book) => (
          <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}>
              <div className={viewMode === "grid" ? "space-y-4" : "flex-shrink-0"}>
                <div className="relative">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className={`object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "grid" ? "w-full h-64" : "w-24 h-32"
                    }`}
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={`space-y-2 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    <Link to={`/books/${book.id}`}>{book.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{book.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({book.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{book.category}</Badge>
                  {book.inStock && <Badge variant="outline">In Stock</Badge>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">${book.price}</span>
                    {book.originalPrice > book.price && (
                      <span className="text-sm text-muted-foreground line-through">${book.originalPrice}</span>
                    )}
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/books/${book.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}

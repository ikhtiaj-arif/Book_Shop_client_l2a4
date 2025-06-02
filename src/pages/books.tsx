/* eslint-disable @typescript-eslint/no-explicit-any */



import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api"
import { useGetAllProductsQuery } from "@/redux/features/products/products.api"
import { ChevronLeft, ChevronRight, Filter, Grid, Heart, List, Search, Star } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"

// Match your exact API type
type TProductQueryParams = {
  page?: number
  limit?: number
  search?: string
  priceMin?: number
  priceMax?: number
  [key: string]: string | number | undefined
}

interface IBook {
  _id?: string
  title: string
  author: string
  description: string
  price: number
  originalPrice?: number
  category: string
  isbn: string
  publisher: string
  publishedDate: string
  language: string
  pages: number
  format: string
  dimensions?: string
  weight?: string
  images: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  tags: string[]
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  discount?: number
  createdAt?: string
  updatedAt?: string
  __v?: number
}

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "title", label: "Title A-Z" },
]

export default function BooksPage() {
  const location = useLocation();

  // Remove "/books" prefix and split the rest
  const categoryPath = location.pathname.replace(/^\/books\/?/, '');
  // const categoryPath = location.pathname;
  const segments = categoryPath ? categoryPath.split('/') : [];

  // const mainCategory = segments[0] || null;
  const categoryId = segments[1] || null;
  console.log(categoryId);
  // Query parameters state
  const [queryParams, setQueryParams] = useState<TProductQueryParams>({
    page: 1,
    limit: 12,
  })

  // UI state
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams((prev) => ({
        ...prev,
        search: searchInput || undefined,
        page: 1, // Reset to first page when searching
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput])

  // Category filter effect
  useEffect(() => {
    setQueryParams((prev) => {
      const updatedParams: TProductQueryParams = {
        ...prev,
        page: 1,
      };


      if (categoryId) {
        updatedParams["categoryId"] = categoryId;
        refetch()
      }

      return updatedParams;
    });
  }, [categoryId]);


  // Price range effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
      priceMax: priceRange[1] < 100 ? priceRange[1] : undefined,
      page: 1,
    }))
  }, [priceRange])

  // Other filters effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      inStock: inStockOnly ? "true" : undefined,
      featured: featuredOnly ? "true" : undefined,
      onSale: onSaleOnly ? "true" : undefined,
      sort: sortBy !== "popularity" ? sortBy : undefined,
      page: 1,
    }))
  }, [inStockOnly, featuredOnly, onSaleOnly, sortBy])

  // API queries
  const { data: booksData, isLoading: booksLoading, refetch } = useGetAllProductsQuery(queryParams)
  console.log(booksData);
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoryQuery(undefined)

  // Extract data from API response
  const books = booksData?.data || []
  const totalBooks = booksData?.meta?.total || booksData?.total || books.length
  const totalPages = booksData?.meta?.totalPages || Math.ceil(totalBooks / (queryParams.limit || 12))
  const categories = categoriesData?.data || []

  // Helper functions
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat: any) => cat._id === categoryId)
    return category ? category.name : "Unknown"
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const clearAllFilters = () => {
    setSearchInput("")
    setSelectedCategories([])
    setPriceRange([0, 100])
    setSortBy("popularity")
    setInStockOnly(false)
    setOnSaleOnly(false)
    setFeaturedOnly(false)
    setQueryParams({
      page: 1,
      limit: queryParams.limit,
    })
  }

  const hasActiveFilters = useMemo(() => {
    return !!(
      queryParams.search ||
      queryParams.category ||
      queryParams.priceMin ||
      queryParams.priceMax ||
      queryParams.inStock ||
      queryParams.featured ||
      queryParams.onSale ||
      (queryParams.sort && queryParams.sort !== "popularity")
    )
  }, [queryParams])

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const current = queryParams.page || 1
    const total = totalPages
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i)
    }

    if (current - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (current + delta < total - 1) {
      rangeWithDots.push("...", total)
    } else if (total > 1) {
      rangeWithDots.push(total)
    }

    return rangeWithDots
  }

  if (booksLoading && (queryParams.page || 1) === 1) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading books...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Books</h1>
        <p className="text-muted-foreground">Discover your next great read from our collection of {totalBooks} books</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books, authors, ISBN..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-3">Categories</h4>
                {isCategoriesLoading ? (
                  <div className="text-sm text-muted-foreground">Loading categories...</div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category: any) => (
                      <div key={category._id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category._id}
                          checked={selectedCategories.includes(category._id)}
                          onCheckedChange={() => handleCategoryToggle(category._id)}
                        />
                        <label htmlFor={category._id} className="text-sm cursor-pointer">
                          {category.name} ({category.count || 0})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="space-y-3">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}+</span>
                  </div>
                </div>
              </div>

              {/* Availability & Features */}
              <div>
                <h4 className="font-semibold mb-3">Availability</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                    <label htmlFor="in-stock" className="text-sm cursor-pointer">
                      In Stock Only
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="on-sale" checked={onSaleOnly} onCheckedChange={setOnSaleOnly} />
                    <label htmlFor="on-sale" className="text-sm cursor-pointer">
                      On Sale
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" checked={featuredOnly} onCheckedChange={setFeaturedOnly} />
                    <label htmlFor="featured" className="text-sm cursor-pointer">
                      Featured Books
                    </label>
                  </div>
                </div>
              </div>

              {/* Items per page */}
              <div>
                <h4 className="font-semibold mb-3">Items per page</h4>
                <Select
                  value={queryParams.limit?.toString() || "12"}
                  onValueChange={(value) => setQueryParams((prev) => ({ ...prev, limit: Number(value), page: 1 }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 per page</SelectItem>
                    <SelectItem value="24">24 per page</SelectItem>
                    <SelectItem value="36">36 per page</SelectItem>
                    <SelectItem value="48">48 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-muted-foreground">
            Showing {((queryParams.page || 1) - 1) * (queryParams.limit || 12) + 1} to{" "}
            {Math.min((queryParams.page || 1) * (queryParams.limit || 12), totalBooks)} of {totalBooks} books
            {hasActiveFilters && " (filtered)"}
          </p>
        </div>
        {booksLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Loading...
          </div>
        )}
      </div>

      {/* Books Grid/List */}
      {books.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-lg font-semibold mb-2">No books found</div>
          <p className="text-muted-foreground mb-4">
            {hasActiveFilters
              ? "Try adjusting your filters to see more results."
              : "We couldn't find any books at the moment."}
          </p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {books.map((book: IBook) => (
            <Card key={book._id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}>
                <div className={viewMode === "grid" ? "space-y-4" : "flex-shrink-0"}>
                  <div className="relative">
                    <img
                      src={book.images || "/placeholder.svg?height=300&width=200"}
                      alt={book.title}
                      className={`object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ${viewMode === "grid" ? "w-full h-64" : "w-24 h-32"
                        }`}
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    {book.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500">-{book.discount}%</Badge>
                    )}
                  </div>
                </div>
                <div className={`space-y-2 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div>
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/books/${book._id}`}>{book.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{book.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({book.reviewCount} reviews)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    <Badge variant="secondary">{getCategoryName(book.category)}</Badge>
                    {book.inStock && <Badge variant="outline">In Stock</Badge>}
                    {book.featured && <Badge className="bg-amber-500 hover:bg-amber-500">Featured</Badge>}
                    {book.bestseller && <Badge variant="default">Bestseller</Badge>}
                    {book.newArrival && <Badge variant="outline">New</Badge>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">${book.price}</span>
                      {book.originalPrice && book.originalPrice > book.price && (
                        <span className="text-sm text-muted-foreground line-through">${book.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/books/${book._id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange((queryParams.page || 1) - 1)}
              disabled={(queryParams.page || 1) === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {getPaginationNumbers().map((pageNum, index) => (
                <div key={index}>
                  {pageNum === "..." ? (
                    <span className="px-3 py-2 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      variant={(queryParams.page || 1) === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum as number)}
                      className="min-w-[40px]"
                    >
                      {pageNum}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => handlePageChange((queryParams.page || 1) + 1)}
              disabled={(queryParams.page || 1) === totalPages}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Page {queryParams.page || 1} of {totalPages}
          </p>
        </div>
      )}
    </div>
  )
}

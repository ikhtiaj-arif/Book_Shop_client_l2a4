/* eslint-disable @typescript-eslint/no-unused-vars */


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
import { BookOpen, Edit, Eye, Plus, Search, Trash2, Filter, X } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/products/products.api"
import { Label } from "@/components/ui/label"
import { CreateBookForm } from "./create-book-from"
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api"

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

// Match your exact API type
type TProductQueryParams = {
  page?: number
  limit?: number
  search?: string
  priceMin?: number
  priceMax?: number
  [key: string]: string | number | undefined
}

const formats = ["All", "Paperback", "Hardcover", "Ebook", "Audiobook"]
const stockStatuses = ["All", "In Stock", "Out of Stock"]
const featuredOptions = ["All", "Featured", "Not Featured"]

export default function AdminManageBooks() {
  // Query parameters state - using your exact type
  const [queryParams, setQueryParams] = useState<TProductQueryParams>({
    page: 1,
    limit: 10,
  })

  // UI state
  const [searchInput, setSearchInput] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFormat, setSelectedFormat] = useState("All")
  const [stockFilter, setStockFilter] = useState("All")
  const [featuredFilter, setFeaturedFilter] = useState("All")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<IBook | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryParams((prev) => ({
        ...prev,
        searchTerm: searchInput || undefined,
        page: 1, // Reset to first page when searching
      }))
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput])

  // Category filter effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      category: selectedCategory === "All" ? undefined : getCategoryId(selectedCategory),
      page: 1,
    }))
  }, [selectedCategory])

  // Format filter effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      format: selectedFormat === "All" ? undefined : selectedFormat,
      page: 1,
    }))
  }, [selectedFormat])

  // Stock filter effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      inStock: stockFilter === "All" ? undefined : stockFilter === "In Stock" ? "true" : "false",
      page: 1,
    }))
  }, [stockFilter])

  // Featured filter effect
  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      featured: featuredFilter === "All" ? undefined : featuredFilter === "Featured" ? "true" : "false",
      page: 1,
    }))
  }, [featuredFilter])

  // API queries
  const { data: booksData, isLoading: booksLoading } = useGetAllProductsQuery(queryParams)
  const { data: categoriesData } = useGetAllCategoryQuery(undefined)
  const [addProduct, { isLoading: isCreating }] = useAddProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  // Extract data from API response
  const books = booksData?.data || []
  const totalBooks = booksData?.meta?.total || booksData?.total || books.length
  const totalPages = booksData?.meta?.totalPages || Math.ceil(totalBooks / (queryParams.limit || 10))
  const categories = categoriesData?.data || []

  // Helper functions
  const getCategoryId = (categoryName: string): string | undefined => {
    if (categoryName === "All") return undefined
    const category = categories.find((cat: any) => cat.name === categoryName)
    return category?._id
  }

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat: any) => cat._id === categoryId)
    return category ? category.name : "Unknown"
  }

  const updateQueryParam = (key: keyof TProductQueryParams, value: any) => {
    setQueryParams((prev) => ({
      ...prev,
      [key]: value === "All" || value === "" || value === undefined ? undefined : value,
      ...(key !== "page" && { page: 1 }), // Reset to first page when changing filters
    }))
  }

  const clearFilters = () => {
    setSearchInput("")
    setSelectedCategory("All")
    setSelectedFormat("All")
    setStockFilter("All")
    setFeaturedFilter("All")
    setQueryParams({
      page: 1,
      limit: queryParams.limit,
    })
  }

  const handleCreateBook = async (bookData: Partial<IBook>) => {
    try {
      await addProduct(bookData).unwrap()
      setIsCreateDialogOpen(false)
      console.log("Book created successfully!")
    } catch (error) {
      console.error("Error creating book:", error)
    }
  }

  const handleUpdateBook = async (bookData: Partial<IBook>) => {
    try {
      await updateProduct({ id: bookData._id, data: bookData }).unwrap()
      setIsEditDialogOpen(false)
      setEditingBook(null)
      console.log("Book updated successfully!")
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  const handleEdit = (book: IBook) => {
    setEditingBook(book)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (book: IBook) => {
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await deleteProduct(book._id).unwrap()
        console.log("Book deleted successfully!")
      } catch (error) {
        console.error("Error deleting book:", error)
      }
    }
  }

  const handleView = (book: IBook) => {
    console.log("Viewing book:", book)
  }

  const handleCancel = () => {
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setEditingBook(null)
  }

  const hasActiveFilters = useMemo(() => {
    return !!(
      queryParams.search ||
      queryParams.category ||
      queryParams.priceMin ||
      queryParams.priceMax ||
      queryParams.format ||
      queryParams.inStock ||
      queryParams.featured
    )
  }, [queryParams])

  const activeFiltersCount = Object.keys(queryParams).filter(
    (key) => key !== "page" && key !== "limit" && queryParams[key] !== undefined,
  ).length

  if (booksLoading && queryParams.page === 1) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading books...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Books</h1>
          <p className="text-muted-foreground">Manage your book inventory, add new books, and update existing ones.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Book</DialogTitle>
            </DialogHeader>
            <CreateBookForm onSubmit={handleCreateBook} onCancel={handleCancel} isLoading={isCreating} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          <CreateBookForm
            editData={editingBook}
            onSubmit={handleUpdateBook}
            onCancel={handleCancel}
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">{hasActiveFilters ? `Filtered results` : "All books"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {queryParams.page} of {totalPages}
            </div>
            <p className="text-xs text-muted-foreground">Page navigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Per Page</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{queryParams.limit}</div>
            <p className="text-xs text-muted-foreground">Items shown</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Filters</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFiltersCount}</div>
            <p className="text-xs text-muted-foreground">Applied filters</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by title, author, or ISBN..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {categories.map((category: any) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Format</Label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Formats" />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((format) => (
                        <SelectItem key={format} value={format}>
                          {format}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Min Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={queryParams.priceMin || ""}
                    onChange={(e) => updateQueryParam("priceMin", e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Max Price</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={queryParams.priceMax || ""}
                    onChange={(e) => updateQueryParam("priceMax", e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Stock Status</Label>
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      {stockStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Featured</Label>
                  <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      {featuredOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Items per page</Label>
                  <Select
                    value={queryParams.limit?.toString() || "10"}
                    onValueChange={(value) => updateQueryParam("limit", Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 per page</SelectItem>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="20">20 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {queryParams.search && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {queryParams.search}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setSearchInput("")
                        updateQueryParam("search", undefined)
                      }}
                    />
                  </Badge>
                )}
                {queryParams.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {getCategoryName(queryParams.category as string)}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory("All")
                        updateQueryParam("category", undefined)
                      }}
                    />
                  </Badge>
                )}
                {queryParams.format && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Format: {queryParams.format}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setSelectedFormat("All")
                        updateQueryParam("format", undefined)
                      }}
                    />
                  </Badge>
                )}
                {(queryParams.priceMin || queryParams.priceMax) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: ${queryParams.priceMin || 0} - ${queryParams.priceMax || "∞"}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        updateQueryParam("priceMin", undefined)
                        updateQueryParam("priceMax", undefined)
                      }}
                    />
                  </Badge>
                )}
                {queryParams.inStock && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {queryParams.inStock === "true" ? "In Stock" : "Out of Stock"}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setStockFilter("All")
                        updateQueryParam("inStock", undefined)
                      }}
                    />
                  </Badge>
                )}
                {queryParams.featured && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {queryParams.featured === "true" ? "Featured" : "Not Featured"}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        setFeaturedFilter("All")
                        updateQueryParam("featured", undefined)
                      }}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {booksLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : books.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {hasActiveFilters
                        ? "No books match your search criteria."
                        : "No books found. Add your first book!"}
                    </TableCell>
                  </TableRow>
                ) : (
                  books.map((book: IBook) => (
                    <TableRow key={book._id || book.isbn}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={book.images || "/placeholder.svg?height=64&width=48"}
                            alt={book.title}
                            className="w-12 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{book.title}</div>
                            <div className="text-sm text-muted-foreground">ISBN: {book.isbn}</div>
                            <div className="flex gap-1 mt-1">
                              {book.featured && (
                                <Badge variant="secondary" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                              {book.bestseller && (
                                <Badge variant="default" className="text-xs">
                                  Bestseller
                                </Badge>
                              )}
                              {book.newArrival && (
                                <Badge variant="outline" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getCategoryName(book.category)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">${book.price}</span>
                          {book.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">${book.originalPrice}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{book.stockQuantity}</span>
                          <span className="text-sm text-muted-foreground">{book.format}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={book.inStock ? "default" : "destructive"} className="text-xs">
                          {book.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">⭐ {book.rating}</span>
                          <span className="text-sm text-muted-foreground">({book.reviewCount} reviews)</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(book)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(book)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(book)} disabled={isDeleting}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {((queryParams.page || 1) - 1) * (queryParams.limit || 10) + 1} to{" "}
            {Math.min((queryParams.page || 1) * (queryParams.limit || 10), totalBooks)} of {totalBooks} books
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if ((queryParams.page || 1) > 1) updateQueryParam("page", (queryParams.page || 1) - 1)
                  }}
                  className={(queryParams.page || 1) === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Show first page */}
              {(queryParams.page || 1) > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        updateQueryParam("page", 1)
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {(queryParams.page || 1) > 4 && <span className="px-2">...</span>}
                </>
              )}

              {/* Show pages around current page */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, (queryParams.page || 1) - 2)) + i
                if (pageNum <= totalPages) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          updateQueryParam("page", pageNum)
                        }}
                        isActive={(queryParams.page || 1) === pageNum}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
                return null
              })}

              {/* Show last page */}
              {(queryParams.page || 1) < totalPages - 2 && (
                <>
                  {(queryParams.page || 1) < totalPages - 3 && <span className="px-2">...</span>}
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        updateQueryParam("page", totalPages)
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if ((queryParams.page || 1) < totalPages) updateQueryParam("page", (queryParams.page || 1) + 1)
                  }}
                  className={(queryParams.page || 1) === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

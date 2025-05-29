/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

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
import { BookOpen, Edit, Eye, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

import {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/products/products.api"
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

const formats = ["All", "Paperback", "Hardcover", "Ebook", "Audiobook"]

export default function AdminManageBooks() {
  const { data: booksData, isLoading: booksLoading } = useGetAllProductsQuery(undefined)
  const { data: categoriesData } = useGetAllCategoryQuery(undefined)
  const categories = categoriesData?.data || []
  const [addProduct, { isLoading: isCreating }] = useAddProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const books = booksData?.data || []
  const categoryOptions = ["All", ...(categories.map((cat: any) => cat.name) || [])]

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFormat, setSelectedFormat] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<IBook | null>(null)
  const booksPerPage = 5

  // Filter books based on search and filters
  const filteredBooks = books.filter((book: IBook) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)

    // Find the category object by ID to get its name
    const categoryObj = categories.find((cat: any) => cat._id === book.category)
    const categoryName = categoryObj ? categoryObj.name : "Unknown"

    const matchesCategory = selectedCategory === "All" || categoryName === selectedCategory
    const matchesFormat = selectedFormat === "All" || book.format === selectedFormat

    return matchesSearch && matchesCategory && matchesFormat
  })

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage)

  const handleCreateBook = async (bookData: Partial<IBook>) => {
    try {
      await addProduct(bookData).unwrap()
      setIsCreateDialogOpen(false)
      // You might want to show a success toast here
      console.log("Book created successfully!")
    } catch (error) {
      console.error("Error creating book:", error)
      // You might want to show an error toast here
    }
  }

  const handleUpdateBook = async (bookData: Partial<IBook>) => {
    try {
      await updateProduct({ id: bookData._id, data: bookData }).unwrap()
      setIsEditDialogOpen(false)
      setEditingBook(null)
      // You might want to show a success toast here
      console.log("Book updated successfully!")
    } catch (error) {
      console.error("Error updating book:", error)
      // You might want to show an error toast here
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
        // You might want to show a success toast here
        console.log("Book deleted successfully!")
      } catch (error) {
        console.error("Error deleting book:", error)
        // You might want to show an error toast here
      }
    }
  }

  const handleView = (book: IBook) => {
    console.log("Viewing book:", book)
    // Implement view functionality - could open a detailed view dialog
  }

  const handleCancel = () => {
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setEditingBook(null)
  }

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: any) => cat._id === categoryId)
    return category ? category.name : "Unknown"
  }

  if (booksLoading) {
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
            <div className="text-2xl font-bold">{books.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.filter((book: IBook) => book.inStock).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.filter((book: IBook) => !book.inStock).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.filter((book: IBook) => book.featured).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by title, author, or ISBN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Format" />
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
                {paginatedBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      {books.length === 0
                        ? "No books found. Add your first book!"
                        : "No books match your search criteria."}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBooks.map((book: IBook) => (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page)
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
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
  )
}

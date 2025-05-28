"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { CreateBookForm } from "./create-book-from"

interface IBook {
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
  createdAt: string
  updatedAt: string
}

// Dummy data
const dummyBooks: IBook[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    price: 12.99,
    originalPrice: 15.99,
    category: "Fiction",
    isbn: "978-0-7432-7356-5",
    publisher: "Scribner",
    publishedDate: "1925-04-10",
    language: "English",
    pages: 180,
    format: "Paperback",
    dimensions: "5.2 x 0.4 x 8 inches",
    weight: "6.4 ounces",
    images: "/placeholder.svg?height=300&width=200",
    rating: 4.2,
    reviewCount: 1250,
    inStock: true,
    stockQuantity: 45,
    tags: ["classic", "american literature", "jazz age"],
    featured: true,
    bestseller: true,
    newArrival: false,
    discount: 19,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    price: 14.99,
    category: "Fiction",
    isbn: "978-0-06-112008-4",
    publisher: "Harper Perennial",
    publishedDate: "1960-07-11",
    language: "English",
    pages: 376,
    format: "Hardcover",
    dimensions: "5.5 x 1.1 x 8.2 inches",
    weight: "1.2 pounds",
    images: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    reviewCount: 2100,
    inStock: true,
    stockQuantity: 32,
    tags: ["classic", "social justice", "coming of age"],
    featured: false,
    bestseller: true,
    newArrival: false,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T16:20:00Z",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    description:
      "An epic science fiction novel set on the desert planet Arrakis, featuring political intrigue and mystical powers.",
    price: 16.99,
    originalPrice: 19.99,
    category: "Science Fiction",
    isbn: "978-0-441-17271-9",
    publisher: "Ace Books",
    publishedDate: "1965-08-01",
    language: "English",
    pages: 688,
    format: "Paperback",
    dimensions: "4.2 x 1.4 x 6.9 inches",
    weight: "11.2 ounces",
    images: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    reviewCount: 3500,
    inStock: true,
    stockQuantity: 28,
    tags: ["sci-fi", "space opera", "politics"],
    featured: true,
    bestseller: false,
    newArrival: true,
    discount: 15,
    createdAt: "2024-01-25T11:00:00Z",
    updatedAt: "2024-01-25T11:00:00Z",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description:
      "Timeless lessons on wealth, greed, and happiness from one of the most important voices in modern finance.",
    price: 18.99,
    category: "Business & Finance",
    isbn: "978-0-857-19703-4",
    publisher: "Harriman House",
    publishedDate: "2020-09-08",
    language: "English",
    pages: 256,
    format: "Hardcover",
    dimensions: "5.5 x 0.9 x 8.2 inches",
    weight: "14.4 ounces",
    images: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    reviewCount: 890,
    inStock: false,
    stockQuantity: 0,
    tags: ["finance", "psychology", "investing"],
    featured: false,
    bestseller: true,
    newArrival: true,
    createdAt: "2024-01-22T13:30:00Z",
    updatedAt: "2024-01-24T10:15:00Z",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "An easy and proven way to build good habits and break bad ones through small changes that deliver remarkable results.",
    price: 17.99,
    originalPrice: 21.99,
    category: "Self-Help",
    isbn: "978-0-7352-1129-2",
    publisher: "Avery",
    publishedDate: "2018-10-16",
    language: "English",
    pages: 320,
    format: "Paperback",
    dimensions: "5.5 x 0.8 x 8.2 inches",
    weight: "10.4 ounces",
    images: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    reviewCount: 4200,
    inStock: true,
    stockQuantity: 67,
    tags: ["habits", "productivity", "self-improvement"],
    featured: true,
    bestseller: true,
    newArrival: false,
    discount: 18,
    createdAt: "2024-01-05T08:45:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
]

const categories = ["All", "Fiction", "Science Fiction", "Business & Finance", "Self-Help", "Biography", "History"]
const formats = ["All", "Paperback", "Hardcover", "Ebook", "Audiobook"]

export default function AdminManageBooks() {
  const [books, setBooks] = useState<IBook[]>(dummyBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFormat, setSelectedFormat] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const booksPerPage = 5

  // Filter books based on search and filters
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory
    const matchesFormat = selectedFormat === "All" || book.format === selectedFormat

    return matchesSearch && matchesCategory && matchesFormat
  })

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage)

  const handleCreateBook = (bookData: Partial<IBook>) => {
    console.log("Creating book with data:", bookData)
    // Here you would typically send the data to your backend API
    setIsCreateDialogOpen(false)
  }

  const handleEdit = (book: IBook) => {
    console.log("Editing book:", book)
    // Implement edit functionality
  }

  const handleDelete = (book: IBook) => {
    console.log("Deleting book:", book)
    // Implement delete functionality
  }

  const handleView = (book: IBook) => {
    console.log("Viewing book:", book)
    // Implement view functionality
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
            <CreateBookForm onSubmit={handleCreateBook} />
          </DialogContent>
        </Dialog>
      </div>

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
            <div className="text-2xl font-bold">{books.filter((book) => book.inStock).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.filter((book) => !book.inStock).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.filter((book) => book.featured).length}</div>
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
                {categories.map((category) => (
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
                {paginatedBooks.map((book, index) => (
                  <TableRow key={book.isbn}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={book.images || "/placeholder.svg"}
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
                      <Badge variant="outline">{book.category}</Badge>
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
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(book)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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

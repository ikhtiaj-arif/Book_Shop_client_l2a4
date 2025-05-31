"use client"


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetAllCategoryQuery, useUpdateCategoryMutation } from "@/redux/features/category/category.api"
import {
    BookOpen,
    BookText,
    Edit,
    MoreVertical,
    Plus,
    Search,
    Star,
    Trash2
} from "lucide-react"
import { useState } from "react"
import { CategoryForm } from "./Category-form"



// Define the Category interface based on the provided payload
interface Category {
    _id?: string
    name: string
    description: string
    image: string
    icon: string
    subcategories: string[]
    count: number
    featured: boolean
    createdAt?: string
    updatedAt?: string
    __v?: number
}

// Map of icon names to Lucide icon components
// const iconMap: Record<string, React.ReactNode> = {
//     BookOpen: <BookOpen className="h-5 w-5" />,
//     BookText: <BookText className="h-5 w-5" />,
//     BookMarked: <BookMarked className="h-5 w-5" />,
//     BookCopy: <BookCopy className="h-5 w-5" />,
//     BookType: <BookType className="h-5 w-5" />,
//     Library: <Library className="h-5 w-5" />,
//     Bookmark: <Bookmark className="h-5 w-5" />,
// }

export default function AdminManageCategories() {
    const { data: categoriesData, isLoading, refetch } = useGetAllCategoryQuery(undefined)
    const [addCategory, { isLoading: isCreating }] = useAddCategoryMutation()
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const categories = categoriesData?.data || []

    // Filter categories based on search term
    const filteredCategories = categories.filter(
        (category: Category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleCreateCategory = async (categoryData: Omit<Category, "_id">) => {
        try {
            await addCategory(categoryData).unwrap()
            setIsCreateDialogOpen(false)
            refetch()
            console.log("Category created successfully!")
        } catch (error) {
            console.error("Error creating category:", error)
        }
    }

    const handleUpdateCategory = async (categoryData: Category) => {
        try {
            await updateCategory({ id: categoryData._id, data: categoryData }).unwrap()
            setIsEditDialogOpen(false)
            setSelectedCategory(null)
            refetch()
            console.log("Category updated successfully!")
        } catch (error) {
            console.error("Error updating category:", error)
        }
    }

    const handleDeleteCategory = async () => {
        if (!selectedCategory?._id) return

        try {
            await deleteCategory(selectedCategory._id).unwrap()
            setIsDeleteDialogOpen(false)
            setSelectedCategory(null)
            refetch()
            console.log("Category deleted successfully!")
        } catch (error) {
            console.error("Error deleting category:", error)
        }
    }

    const handleEdit = (category: Category) => {
        setSelectedCategory(category)
        setIsEditDialogOpen(true)
    }

    const handleDelete = (category: Category) => {
        setSelectedCategory(category)
        setIsDeleteDialogOpen(true)
    }

    // const renderIcon = (iconName: string) => {
    //     return iconMap[iconName] || <BookOpen className="h-5 w-5" />
    // }

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading categories...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Categories</h1>
                    <p className="text-muted-foreground">Create, update, and organize book categories for your store.</p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <CategoryForm onSubmit={handleCreateCategory} isLoading={isCreating} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    {selectedCategory && (
                        <CategoryForm initialData={selectedCategory} onSubmit={handleUpdateCategory} isLoading={isUpdating} />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the category "{selectedCategory?.name}". This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteCategory}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categories.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Featured Categories</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categories.filter((cat: Category) => cat.featured).length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Books</CardTitle>
                        <div className="h-4 w-4 text-muted-foreground">
                            <BookText className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {categories.reduce((sum: number, cat: Category) => sum + cat.count, 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Categories Table */}
            <Card>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Subcategories</TableHead>
                                    <TableHead>Books</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            {categories.length === 0
                                                ? "No categories found. Add your first category!"
                                                : "No categories match your search criteria."}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCategories.map((category: Category) => (
                                        <TableRow key={category._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center">
                                                        <img src={category.image} className="w-10 h-10 rounded-full" alt="category" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{category.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Created {new Date(category.createdAt || "").toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="truncate">{category.description}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {category.subcategories.length > 0 ? (
                                                        category.subcategories.slice(0, 3).map((sub, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {sub}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm">None</span>
                                                    )}
                                                    {category.subcategories.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{category.subcategories.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{category.count}</TableCell>
                                            <TableCell>
                                                {category.featured ? (
                                                    <Badge className="bg-amber-500 hover:bg-amber-500/90">Featured</Badge>
                                                ) : (
                                                    <Badge variant="outline">Standard</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleDelete(category)}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

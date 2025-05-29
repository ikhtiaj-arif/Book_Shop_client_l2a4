/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api"
import { handleImageUpload } from "@/utils/imageUrlGenerator"


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

interface CreateBookFormProps {
    editData?: IBook | null
    onSubmit: (bookData: Partial<IBook>) => void
    onCancel?: () => void
    isLoading?: boolean
}

const formats = ["Paperback", "Hardcover", "Ebook", "Audiobook"]
const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese"]

export function CreateBookForm({ editData, onSubmit, onCancel, isLoading }: CreateBookFormProps) {
    const [formData, setFormData] = useState<Partial<IBook>>({
        title: "",
        author: "",
        description: "",
        price: 0,
        originalPrice: undefined,
        category: "",
        isbn: "",
        publisher: "",
        publishedDate: "",
        language: "English",
        pages: 0,
        format: "",
        dimensions: "",
        weight: "",
        images: "",
        rating: 0,
        reviewCount: 0,
        inStock: true,
        stockQuantity: 0,
        tags: [],
        featured: false,
        bestseller: false,
        newArrival: true,
        discount: undefined,
    })

    const [currentTag, setCurrentTag] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const { data: categoriesData } = useGetAllCategoryQuery(undefined)
    const categories = categoriesData?.data || []

    // Set form data when editData is provided
    useEffect(() => {
        if (editData) {
            setFormData({
                ...editData,
                // Convert publishedDate to YYYY-MM-DD format for date input
                publishedDate: editData.publishedDate ? new Date(editData.publishedDate).toISOString().split("T")[0] : "",
            })
        }
    }, [editData])

    const handleInputChange = (field: keyof IBook, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const addTag = () => {
        if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...(prev.tags || []), currentTag.trim()],
            }))
            setCurrentTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = formData.images || "" // Keep existing image if not changed

            // Upload new image if a file is selected
            if (selectedFile) {
                const uploadedImageUrl = await handleImageUpload(selectedFile)
                if (!uploadedImageUrl) {
                    throw new Error("Image upload failed")
                }
                imageUrl = uploadedImageUrl
            }

            let bookData: Partial<IBook>

            if (editData) {
                // For editing, include the ID and update timestamp
                bookData = {
                    ...formData,
                    _id: editData._id,
                    images: imageUrl,
                    updatedAt: new Date().toISOString(),
                }
            } else {
                // For creating, add timestamps
                const now = new Date().toISOString()
                bookData = {
                    ...formData,
                    images: imageUrl,
                    createdAt: now,
                    updatedAt: now,
                }
            }

            onSubmit(bookData)
        } catch (error) {
            console.error("Error submitting form:", error)
            // You might want to show an error toast here
        } finally {
            setIsUploading(false)
        }
    }

    const isEditing = !!editData
    const isSubmitting = isLoading || isUploading

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                className="mt-1"
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Enter book title"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="author">Author *</Label>
                            <Input
                                className="mt-1"
                                id="author"
                                value={formData.author}
                                onChange={(e) => handleInputChange("author", e.target.value)}
                                placeholder="Enter author name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                className="mt-1"
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Enter book description"
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="isbn">ISBN *</Label>
                            <Input
                                className="mt-1"
                                id="isbn"
                                value={formData.isbn}
                                onChange={(e) => handleInputChange("isbn", e.target.value)}
                                placeholder="978-0-123456-78-9"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Publishing Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Publishing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="publisher">Publisher *</Label>
                            <Input
                                className="mt-1"
                                id="publisher"
                                value={formData.publisher}
                                onChange={(e) => handleInputChange("publisher", e.target.value)}
                                placeholder="Enter publisher name"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="publishedDate">Published Date *</Label>
                            <Input
                                className="mt-1"
                                id="publishedDate"
                                type="date"
                                value={formData.publishedDate}
                                onChange={(e) => handleInputChange("publishedDate", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="category" className="mb-1">
                                Category *
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category: any) => (
                                        <SelectItem key={category._id} value={category._id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="language" className="mb-1">
                                Language *
                            </Label>
                            <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages.map((language) => (
                                        <SelectItem key={language} value={language}>
                                            {language}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Physical Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Physical Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="format">Format *</Label>
                            <Select value={formData.format} onValueChange={(value) => handleInputChange("format", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select format" />
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
                            <Label htmlFor="pages">Pages *</Label>
                            <Input
                                className="mt-1"
                                id="pages"
                                type="number"
                                value={formData.pages}
                                onChange={(e) => handleInputChange("pages", Number.parseInt(e.target.value) || 0)}
                                placeholder="Number of pages"
                                min="1"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="dimensions">Dimensions</Label>
                            <Input
                                className="mt-1"
                                id="dimensions"
                                value={formData.dimensions}
                                onChange={(e) => handleInputChange("dimensions", e.target.value)}
                                placeholder="5.5 x 0.8 x 8.2 inches"
                            />
                        </div>

                        <div>
                            <Label htmlFor="weight">Weight</Label>
                            <Input
                                className="mt-1"
                                id="weight"
                                value={formData.weight}
                                onChange={(e) => handleInputChange("weight", e.target.value)}
                                placeholder="10.4 ounces"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Pricing & Inventory */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="price">Price *</Label>
                            <Input
                                className="mt-1"
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                                placeholder="19.99"
                                min="0"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="originalPrice">Original Price</Label>
                            <Input
                                className="mt-1"
                                id="originalPrice"
                                type="number"
                                step="0.01"
                                value={formData.originalPrice || ""}
                                onChange={(e) =>
                                    handleInputChange("originalPrice", e.target.value ? Number.parseFloat(e.target.value) : undefined)
                                }
                                placeholder="24.99"
                                min="0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="discount">Discount %</Label>
                            <Input
                                className="mt-1"
                                id="discount"
                                type="number"
                                value={formData.discount || ""}
                                onChange={(e) =>
                                    handleInputChange("discount", e.target.value ? Number.parseInt(e.target.value) : undefined)
                                }
                                placeholder="15"
                                min="0"
                                max="100"
                            />
                        </div>

                        <div>
                            <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                            <Input
                                className="mt-1"
                                id="stockQuantity"
                                type="number"
                                value={formData.stockQuantity}
                                onChange={(e) => handleInputChange("stockQuantity", Number.parseInt(e.target.value) || 0)}
                                placeholder="50"
                                min="0"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="images">{isEditing ? "Update Image" : "Upload Image"}</Label>
                            <Input className="mt-1" id="images" type="file" accept="image/*" onChange={handleFileChange} />
                            {isEditing && formData.images && !selectedFile && (
                                <div className="mt-2">
                                    <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                                    <img
                                        src={formData.images || "/placeholder.svg"}
                                        alt="Current book cover"
                                        className="w-20 h-28 object-cover rounded border"
                                    />
                                </div>
                            )}
                            {selectedFile && <p className="text-sm text-green-600 mt-1">New image selected: {selectedFile.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="rating">Initial Rating</Label>
                            <Input
                                className="mt-1"
                                id="rating"
                                type="number"
                                step="0.1"
                                value={formData.rating}
                                onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value) || 0)}
                                placeholder="4.5"
                                min="0"
                                max="5"
                            />
                        </div>

                        <div>
                            <Label htmlFor="reviewCount">Review Count</Label>
                            <Input
                                className="mt-1"
                                id="reviewCount"
                                type="number"
                                value={formData.reviewCount}
                                onChange={(e) => handleInputChange("reviewCount", Number.parseInt(e.target.value) || 0)}
                                placeholder="150"
                                min="0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex gap-2 items-center mb-2">
                                <Input
                                    className="mt-1"
                                    id="tags"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    placeholder="Add a tag"
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault()
                                            addTag()
                                        }
                                    }}
                                />
                                <Button type="button" className="mt-1" onClick={addTag} variant="outline">
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {formData.tags?.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Toggles */}
                <Card>
                    <CardHeader>
                        <CardTitle>Status & Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="inStock">In Stock</Label>
                            <Switch
                                id="inStock"
                                checked={formData.inStock}
                                onCheckedChange={(checked) => handleInputChange("inStock", checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="featured">Featured</Label>
                            <Switch
                                id="featured"
                                checked={formData.featured}
                                onCheckedChange={(checked) => handleInputChange("featured", checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="bestseller">Bestseller</Label>
                            <Switch
                                id="bestseller"
                                checked={formData.bestseller}
                                onCheckedChange={(checked) => handleInputChange("bestseller", checked)}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="newArrival">New Arrival</Label>
                            <Switch
                                id="newArrival"
                                checked={formData.newArrival}
                                onCheckedChange={(checked) => handleInputChange("newArrival", checked)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isUploading
                        ? "Uploading image..."
                        : isLoading
                            ? isEditing
                                ? "Updating..."
                                : "Creating..."
                            : isEditing
                                ? "Update Book"
                                : "Create Book"}
                </Button>
            </div>
        </form>
    )
}

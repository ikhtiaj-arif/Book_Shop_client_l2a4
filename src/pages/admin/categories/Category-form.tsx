/* eslint-disable @typescript-eslint/no-explicit-any */


import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { handleImageUpload } from "@/utils/imageUrlGenerator"
import { Plus, X } from "lucide-react"
import { useEffect, useState } from "react"

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

interface CategoryFormProps {
    initialData?: Category
    onSubmit: (data: any) => void
    isLoading?: boolean
}

// Available icons for categories
const availableIcons = ["BookOpen", "BookText", "BookMarked", "BookCopy", "BookType", "Library", "Bookmark"]

export function CategoryForm({ initialData, onSubmit, isLoading }: CategoryFormProps) {
    const [formData, setFormData] = useState<Omit<Category, "_id" | "createdAt" | "updatedAt" | "__v">>({
        name: "",
        description: "",
        image: "",
        icon: "BookOpen",
        subcategories: [],
        count: 0,
        featured: false,
    })

    const [currentSubcategory, setCurrentSubcategory] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    // Set form data when initialData is provided (edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                image: initialData.image,
                icon: initialData.icon,
                subcategories: [...initialData.subcategories],
                count: initialData.count,
                featured: initialData.featured,
            })
            setPreviewImage(initialData.image)
        }
    }, [initialData])

    const handleInputChange = (field: keyof Category, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file)
            setPreviewImage(previewUrl)
        }
    }

    const addSubcategory = () => {
        if (currentSubcategory.trim() && !formData.subcategories.includes(currentSubcategory.trim())) {
            setFormData((prev) => ({
                ...prev,
                subcategories: [...prev.subcategories, currentSubcategory.trim()],
            }))
            setCurrentSubcategory("")
        }
    }

    const removeSubcategory = (subcategoryToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            subcategories: prev.subcategories.filter((sub) => sub !== subcategoryToRemove),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUploading(true)

        try {
            let imageUrl = formData.image

            // Upload new image if a file is selected
            if (selectedFile) {
                const uploadedImageUrl = await handleImageUpload(selectedFile)
                if (!uploadedImageUrl) {
                    throw new Error("Image upload failed")
                }
                imageUrl = uploadedImageUrl
            }

            // Prepare the data for submission
            const categoryData = {
                ...formData,
                image: imageUrl,
                // If editing, include the _id
                ...(initialData?._id ? { _id: initialData._id } : {}),
            }

            onSubmit(categoryData)
        } catch (error) {
            console.error("Error submitting form:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const isSubmitting = isLoading || isUploading
    const isEditing = !!initialData

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Category Name *</Label>
                        <Input
                            className="mt-1"

                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter category name"
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
                            placeholder="Enter category description"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="icon" className="mb-1">Icon *</Label>
                        <Select value={formData.icon} onValueChange={(value) => handleInputChange("icon", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableIcons.map((icon) => (
                                    <SelectItem key={icon} value={icon}>
                                        {icon}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="image">{isEditing ? "Update Image" : "Upload Image"} *</Label>
                        <Input
                            className="mt-1" id="image" type="file" accept="image/*" onChange={handleFileChange} />
                        {previewImage && (
                            <div className="mt-2">
                                <p className="text-sm text-muted-foreground mb-2">Image preview:</p>
                                <img
                                    src={previewImage || "/placeholder.svg"}
                                    alt="Category preview"
                                    className="w-full max-w-xs h-auto object-cover rounded border"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="subcategories">Subcategories</Label>
                        <div className="flex gap-2 items-center mb-2">
                            <Input
                                className="mt-1"
                                id="subcategories"
                                value={currentSubcategory}
                                onChange={(e) => setCurrentSubcategory(e.target.value)}
                                placeholder="Add a subcategory"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addSubcategory()
                                    }
                                }}
                            />
                            <Button type="button" onClick={addSubcategory} variant="outline" size="sm">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {formData.subcategories.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No subcategories added yet</p>
                            ) : (
                                formData.subcategories.map((subcategory, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                        {subcategory}
                                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeSubcategory(subcategory)} />
                                    </Badge>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Switch
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) => handleInputChange("featured", checked)}
                        />
                        <Label htmlFor="featured">Featured Category</Label>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isSubmitting}>
                    {isUploading
                        ? "Uploading image..."
                        : isLoading
                            ? isEditing
                                ? "Updating..."
                                : "Creating..."
                            : isEditing
                                ? "Update Category"
                                : "Create Category"}
                </Button>
            </div>
        </form>
    )
}

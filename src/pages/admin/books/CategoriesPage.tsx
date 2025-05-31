"use client"

import { Link } from "react-router-dom"
import { BookOpen, TrendingUp, Heart, Zap, Users, Baby, Briefcase, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api"


// Icon mapping for categories
const categoryIcons: { [key: string]: any } = {
  Fiction: BookOpen,
  "Non-Fiction": Lightbulb,
  Mystery: Zap,
  Romance: Heart,
  "Science Fiction": TrendingUp,
  Children: Baby,
  Business: Briefcase,
  Biography: Users,
}

const getCategoryIcon = (categoryName: string) => {
  return categoryIcons[categoryName] || BookOpen
}

export default function CategoriesPage() {
  const { data: categoriesData, isLoading: isCategoriesLoading, error: categoriesError } = useGetAllCategoryQuery(undefined)

  const categories = categoriesData?.data || []
  const featuredCategories = categories.filter((cat) => cat.featured).slice(0, 3)

  if (isCategoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/3] bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (categoriesError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Categories</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover your next favorite book by exploring our carefully curated categories
        </p>
      </div>

      {/* Featured Categories */}
      {featuredCategories.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = getCategoryIcon(category.name)
              return (
                <Card key={category._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 rounded-full bg-primary text-white">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} books</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Link to={`/books?category=${category._id}`} className="text-primary hover:underline font-medium">
                      Explore {category.name} →
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* All Categories Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = getCategoryIcon(category.name)
            return (
              <Card key={category._id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary text-white">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.count} books</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link
                    to={`/books?category=${category._id}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Browse {category.name} →
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>
    </div>
  )
}

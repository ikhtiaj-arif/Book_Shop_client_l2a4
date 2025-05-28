"use client"

import { Link } from "react-router-dom"
import { BookOpen, TrendingUp, Heart, Zap, Users, Baby, Briefcase, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

// Mock data - replace with API calls later
const categories = [
  {
    id: 1,
    name: "Fiction",
    description: "Immerse yourself in captivating stories and imaginative worlds",
    bookCount: 1250,
    image: "/placeholder.svg?height=300&width=400",
    icon: BookOpen,
    color: "bg-blue-500",
    subcategories: ["Literary Fiction", "Mystery & Thriller", "Science Fiction", "Fantasy", "Romance"],
  },
  {
    id: 2,
    name: "Non-Fiction",
    description: "Expand your knowledge with real-world insights and facts",
    bookCount: 890,
    image: "/placeholder.svg?height=300&width=400",
    icon: Lightbulb,
    color: "bg-green-500",
    subcategories: ["Biography", "History", "Science", "Self-Help", "Business"],
  },
  {
    id: 3,
    name: "Mystery & Thriller",
    description: "Edge-of-your-seat suspense and mind-bending puzzles",
    bookCount: 567,
    image: "/placeholder.svg?height=300&width=400",
    icon: Zap,
    color: "bg-red-500",
    subcategories: ["Crime", "Psychological Thriller", "Cozy Mystery", "Police Procedural"],
  },
  {
    id: 4,
    name: "Romance",
    description: "Love stories that will make your heart flutter",
    bookCount: 432,
    image: "/placeholder.svg?height=300&width=400",
    icon: Heart,
    color: "bg-pink-500",
    subcategories: ["Contemporary", "Historical", "Paranormal", "Young Adult"],
  },
  {
    id: 5,
    name: "Science Fiction",
    description: "Explore the future and beyond with cutting-edge stories",
    bookCount: 321,
    image: "/placeholder.svg?height=300&width=400",
    icon: TrendingUp,
    color: "bg-purple-500",
    subcategories: ["Space Opera", "Dystopian", "Cyberpunk", "Time Travel"],
  },
  {
    id: 6,
    name: "Children's Books",
    description: "Wonderful stories to inspire young minds",
    bookCount: 678,
    image: "/placeholder.svg?height=300&width=400",
    icon: Baby,
    color: "bg-yellow-500",
    subcategories: ["Picture Books", "Early Readers", "Middle Grade", "Young Adult"],
  },
  {
    id: 7,
    name: "Business",
    description: "Professional development and entrepreneurship guides",
    bookCount: 234,
    image: "/placeholder.svg?height=300&width=400",
    icon: Briefcase,
    color: "bg-indigo-500",
    subcategories: ["Leadership", "Marketing", "Finance", "Entrepreneurship"],
  },
  {
    id: 8,
    name: "Biography",
    description: "Inspiring life stories of remarkable people",
    bookCount: 345,
    image: "/placeholder.svg?height=300&width=400",
    icon: Users,
    color: "bg-orange-500",
    subcategories: ["Historical Figures", "Celebrities", "Politicians", "Athletes"],
  },
]

const featuredCategories = categories.slice(0, 3)
const popularSubcategories = [
  "Literary Fiction",
  "Self-Help",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Children's Picture Books",
  "Biography",
  "Business",
]

export default function CategoriesPage() {
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
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredCategories.map((category) => (
            <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 left-4">
                  <div className={`p-3 rounded-full ${category.color} text-white`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.bookCount} books</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <Badge key={sub} variant="secondary" className="text-xs">
                      {sub}
                    </Badge>
                  ))}
                  {category.subcategories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{category.subcategories.length - 3} more
                    </Badge>
                  )}
                </div>
                <Link to={`/books?category=${category.name}`} className="text-primary hover:underline font-medium">
                  Explore {category.name} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.bookCount} books</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                <Link
                  to={`/books?category=${category.name}`}
                  className="text-primary hover:underline text-sm font-medium"
                >
                  Browse {category.name} →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Subcategories */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Popular Subcategories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularSubcategories.map((subcategory) => (
            <Card key={subcategory} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{subcategory}</h3>
                <Link to={`/books?subcategory=${subcategory}`} className="text-sm text-primary hover:underline">
                  Explore →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

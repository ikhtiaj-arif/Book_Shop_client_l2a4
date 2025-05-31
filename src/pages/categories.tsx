import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllCategoryQuery } from "@/redux/features/category/category.api";
import { BookOpen, Flame, Library, Star } from "lucide-react"; // Example icons
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface ICategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  subcategories: string[];
  count: number;
  featured: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Star,
  Library,
  Flame,
  // add more icon mappings as needed
}


export default function CategoriesPage() {
  const { data: categoryData, isLoading } = useGetAllCategoryQuery(undefined)
  const categories = categoryData?.data
  const featuredCategories = categories?.filter((cat: ICategory) => cat.featured)
  const popularSubcategories = [
    ...new Set(categories?.flatMap((cat: ICategory) => cat.subcategories).slice(0, 8))
  ]
  if (isLoading) return <Loading/>
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
      {featuredCategories?.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories?.map((category: ICategory) => {
              const Icon = iconMap[category.icon] || BookOpen
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
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} books</p>
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
              )
            })}
          </div>
        </section>
      )}

      {/* All Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((category: ICategory) => {
            const Icon = iconMap[category.icon] || BookOpen
            return (
              <Card key={category._id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{category.count} books</p>
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
            )
          })}
        </div>
      </section>

      {/* Popular Subcategories */}
      <section>
        <h2 className="text-2xl font-bold mb-8">Popular Subcategories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularSubcategories.map((subcategory) => (
            <Card key={subcategory as string} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{subcategory as string}</h3>
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

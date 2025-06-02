"use client"

import type React from "react"

import { LogOut, MenuIcon, ShoppingCart, User } from "lucide-react"
import { useState, useMemo } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import logo from "../img/logo.png"

import { useGetAllCategoryQuery } from "@/redux/features/category/category.api"
import { useGetAllProductsQuery } from "@/redux/features/products/products.api"
import type { ICategory } from "@/types/types"
import { ModeToggle } from "../components/mode-toggle"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import { cn } from "../lib/utils"
import { currentUser, logOut } from "../redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import Footer from "./footer"
import CartButton from "@/components/cart/cart-button"

// Type definitions
interface Book {
  _id: string
  title: string
  author: string
  description: string
  price: number
  originalPrice: number
  isbn: string
  publisher: string
  publishedDate: string
  language: string
  pages: number
  format: string
  dimensions: string
  weight: string
  images: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  tags: string[]
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  discount: number
  category: ICategory | null
  createdAt: string
  updatedAt: string
}

interface MenuSection {
  title: string
  items: Array<{
    title: string
    path: string
    image?: string
    author?: string
    price?: number
    rating?: number
  }>
}

interface MegaMenuItem {
  id: string
  title: string
  path?: string
  featured?: {
    title: string
    description: string
    image: string
    link: string
  } | null
  sections?: MenuSection[]
  isLoading: boolean
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  href: string
}

const ListItem = ({ className, title, href, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

// const CartButton = () => {
//   const cartCount = 3

//   return (
//     <Button variant="ghost" size="icon" className="relative">
//       <ShoppingCart className="h-5 w-5" />
//       {cartCount > 0 && (
//         <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">{cartCount}</Badge>
//       )}
//     </Button>
//   )
// }

export default function MainLayout() {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoryQuery(undefined)
  const { data: bestSellerData, isLoading: isBestSellersLoading } = useGetAllProductsQuery({ bestseller: "true" })
  const { data: newArrivalData, isLoading: isNewArrivalsLoading } = useGetAllProductsQuery({ newArrival: "true" })
  const { data: featuredData, isLoading: isFeaturedLoading } = useGetAllProductsQuery({ featured: "true" })
  const { data: topRatedData, isLoading: isTopRatedLoading } = useGetAllProductsQuery({ rating: 4.5 })

  const categories: ICategory[] = categoriesData?.data || []
  const bestSellers: Book[] = bestSellerData?.data || []
  const newArrivals: Book[] = newArrivalData?.data || []
  const featured: Book[] = featuredData?.data || []
  const topRated: Book[] = topRatedData?.data || []

  // Helper functions with proper type safety
  const getUniqueValues = (books: Book[], key: keyof Book): string[] => {
    const values = books
      .map((book) => book[key])
      .filter((value): value is string => typeof value === "string" && Boolean(value))
    return [...new Set(values)]
  }

  const getUniqueCategories = (books: Book[]): ICategory[] => {
    const categoryMap = new Map<string, ICategory>()

    books.forEach((book) => {
      if (book.category && book.category._id) {
        categoryMap.set(book.category._id, book.category)
      }
    })

    return Array.from(categoryMap.values())
  }

  const safeSortBooks = (books: Book[], sortFn: (a: Book, b: Book) => number): Book[] => {
    return [...books].sort(sortFn)
  }

  // Memoized transformations to prevent unnecessary recalculations
  const megaMenuItems: MegaMenuItem[] = useMemo(() => {
    // Transform categories data
    const categoriesTransformed: MegaMenuItem = {
      id: "categories",
      title: "Categories",
      featured: null,
      sections: isCategoriesLoading
        ? []
        : categories.map((category: ICategory) => ({
            title: category.name,
            items: category.subcategories.map((sub) => ({
              title: sub,
              path: `/books/categoryId/${category._id}?subcategory=${encodeURIComponent(sub)}`,
            })),
          })),
      isLoading: isCategoriesLoading,
    }

    // Transform best sellers data
    const bestSellersTransformed: MegaMenuItem = {
      id: "best-sellers",
      title: "Best Sellers",
      featured: null,
      sections: isBestSellersLoading
        ? []
        : [
            {
              title: "Best Selling Books",
              items: bestSellers.slice(0, 12).map((book: Book) => ({
                title: book.title,
                path: `/books/${book._id}`,
                image: book.images,
                author: book.author,
                price: book.price,
              })),
            },
          ],
      isLoading: isBestSellersLoading,
    }

    // Transform new arrivals data
    const newArrivalsTransformed: MegaMenuItem = {
      id: "new-arrivals",
      title: "New Arrivals",
      featured: null,
      sections: isNewArrivalsLoading
        ? []
        : [
            {
              title: "Latest Books",
              items: safeSortBooks(
                newArrivals,
                (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime(),
              )
                .slice(0, 12)
                .map((book: Book) => ({
                  title: book.title,
                  path: `/books/${book._id}`,
                  image: book.images,
                  author: book.author,
                  price: book.price,
                })),
            },
          ],
      isLoading: isNewArrivalsLoading,
    }

    // Transform top rated data
    const topRatedTransformed: MegaMenuItem = {
      id: "top-rated",
      title: "Top Rated",
      featured: null,
      sections: isTopRatedLoading
        ? []
        : [
            {
              title: "Highest Rated Books",
              items: safeSortBooks(topRated, (a, b) => (b.rating || 0) - (a.rating || 0))
                .slice(0, 12)
                .map((book: Book) => ({
                  title: book.title,
                  path: `/books/${book._id}`,
                  image: book.images,
                  author: book.author,
                  price: book.price,
                  rating: book.rating,
                })),
            },
          ],
      isLoading: isTopRatedLoading,
    }

    return [
      {
        id: "browse-all",
        title: "Browse All Books",
        path: "/books",
        featured: null,
        isLoading: false,
      },
      bestSellersTransformed,
      newArrivalsTransformed,
      topRatedTransformed,
      categoriesTransformed,
    ]
  }, [
    categories,
    bestSellers,
    newArrivals,
    topRated,
    isCategoriesLoading,
    isBestSellersLoading,
    isNewArrivalsLoading,
    isTopRatedLoading,
  ])

  const mainNavItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ]

  const user = useAppSelector(currentUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  const handleLogout = () => {
    dispatch(logOut())
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 mx-auto items-center">
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} className="h-10 w-10" alt="Logo" />
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-primary">Book</span> <span className="text-primary">Shop</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-auto items-center space-x-4">
            {/* Main Nav */}
            <nav className="flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleNavigate(`/${user?.role}/profile`)}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate(`/${user?.role}/dashboard`)}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-t text-destructive mt-2" onClick={handleLogout}>
                    <LogOut className="size-4 text-destructive ml-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
            <ModeToggle />
            {/* Cart */}
            <CartButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden ml-auto items-center space-x-2">
            <CartButton />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleNavigate(`/${user?.role}/profile`)}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigate(`/${user?.role}/dashboard`)}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="border-t text-destructive mt-2" onClick={handleLogout}>
                    <LogOut className="size-4 text-destructive ml-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                <User className="h-5 w-5" />
              </Button>
            )}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4 px-2">
                  <div className="space-y-2">
                    {mainNavItems.map((item) => (
                      <Button
                        key={item.path}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          navigate(item.path)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {item.title}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <h3 className="mb-2 px-2 text-lg font-semibold">Categories</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {megaMenuItems.map((category) => (
                        <AccordionItem key={category.id} value={category.id}>
                          {category.path ? (
                            <div className="flex items-center justify-between py-4 px-2">
                              <Link
                                to={category.path}
                                className="text-sm font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {category.title}
                              </Link>
                            </div>
                          ) : (
                            <AccordionTrigger className="py-2">{category.title}</AccordionTrigger>
                          )}

                          <AccordionContent>
                            {category.isLoading ? (
                              <div className="flex items-center justify-center py-4">
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                                  <span className="text-xs text-muted-foreground">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              category.sections?.map((section, idx) => (
                                <div key={idx} className="mb-4">
                                  <h4 className="mb-1 px-2 text-sm font-medium">{section.title}</h4>
                                  <div className="space-y-1">
                                    {section.items.length > 0 ? (
                                      section.items.map((item, itemIdx) => (
                                        <Button
                                          key={itemIdx}
                                          variant="ghost"
                                          className="w-full justify-start pl-4 text-sm"
                                          onClick={() => {
                                            navigate(item.path)
                                            setMobileMenuOpen(false)
                                          }}
                                        >
                                          {item.title}
                                        </Button>
                                      ))
                                    ) : (
                                      <p className="px-4 text-xs text-muted-foreground">No items available</p>
                                    )}
                                  </div>
                                </div>
                              ))
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Desktop Mega Menu */}
      <div className="hidden md:block border-b">
        <div className="container mx-auto">
          <NavigationMenu>
            <NavigationMenuList>
              {
                megaMenuItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    {item.path ? (
                      <Link to={item.path} className={navigationMenuTriggerStyle()}>
                        {item.title}
                      </Link>
                    ) : (
                      <>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[800px] p-4">
                            {item.isLoading ? (
                              <div className="flex items-center justify-center py-8">
                                <div className="flex items-center space-x-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                  <span className="text-sm text-muted-foreground">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <div className="grid gap-6">
                                {item.sections?.map((section, idx) => (
                                  <div key={idx}>
                                    <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
                                    {section.items.length > 0 ? (
                                      item.id === "categories" ? (
                                        <div className="grid grid-cols-4 gap-4">
                                          {section.items.map((subItem, subIdx) => (
                                            <Link
                                              key={subIdx}
                                              to={subItem.path}
                                              className="block p-3 rounded-lg hover:bg-accent transition-colors"
                                            >
                                              <div className="text-sm font-medium">{subItem.title}</div>
                                            </Link>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-3 gap-4">
                                          {section.items.map((subItem, subIdx) => (
                                            <Link
                                              key={subIdx}
                                              to={subItem.path}
                                              className="block p-3 rounded-lg hover:bg-accent transition-colors group"
                                            >
                                              <div className="flex items-start space-x-3">
                                                {subItem.image && (
                                                  <img
                                                    src={subItem.image || "/placeholder.svg"}
                                                    alt={subItem.title}
                                                    className="w-12 h-16 object-cover rounded flex-shrink-0"
                                                    onError={(e) => {
                                                      e.currentTarget.src = "/placeholder.svg?height=64&width=48"
                                                    }}
                                                  />
                                                )}
                                                <div className="flex-1 min-w-0">
                                                  <div className="text-sm font-medium line-clamp-2 group-hover:text-primary">
                                                    {subItem.title}
                                                  </div>
                                                  {subItem.author && (
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                      by {subItem.author}
                                                    </div>
                                                  )}
                                                  <div className="flex items-center justify-between mt-2">
                                                    {subItem.price && (
                                                      <span className="text-sm font-semibold text-primary">
                                                        ${subItem.price}
                                                      </span>
                                                    )}
                                                    {subItem.rating && (
                                                      <span className="text-xs text-muted-foreground">
                                                        ⭐ {subItem.rating}
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </Link>
                                          ))}
                                        </div>
                                      )
                                    ) : (
                                      <p className="text-sm text-muted-foreground">No items available</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                )
              )}
              
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

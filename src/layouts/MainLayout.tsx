"use client"

import type React from "react"

import { MenuIcon, ShoppingCart, User } from "lucide-react"
import { useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import logo from "../img/logo.png"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
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
import { currentUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"
import { ModeToggle } from "../components/mode-toggle"
import Footer from "./footer"


// This would come from your backend in a real implementation
const megaMenuItems = [
    {
        id: "browse-all",
        title: "Browse All Books",
        path: "/books",
        featured: null,
    },
    {
        id: "kids",
        title: "Kids",
        featured: {
            title: "Featured Book",
            description: "Discover our top pick for young readers this month",
            image: "/placeholder.svg?height=200&width=150",
            link: "/books/featured/kids",
        },
        sections: [
            {
                title: "By Age",
                items: [
                    { title: "0-2 Years", path: "/books/kids/0-2" },
                    { title: "3-5 Years", path: "/books/kids/3-5" },
                    { title: "6-8 Years", path: "/books/kids/6-8" },
                    { title: "9-12 Years", path: "/books/kids/9-12" },
                ],
            },
            {
                title: "By Category",
                items: [
                    { title: "Picture Books", path: "/books/kids/picture-books" },
                    { title: "Early Readers", path: "/books/kids/early-readers" },
                    { title: "Chapter Books", path: "/books/kids/chapter-books" },
                    { title: "Activity Books", path: "/books/kids/activity-books" },
                ],
            },
        ],
    },
    {
        id: "best-sellers",
        title: "Best Sellers",
        featured: {
            title: "Top Seller",
            description: "This month's most popular book",
            image: "/placeholder.svg?height=200&width=150",
            link: "/books/best-sellers/top",
        },
        sections: [
            {
                title: "Fiction",
                items: [
                    { title: "Literary Fiction", path: "/books/best-sellers/fiction/literary" },
                    { title: "Mystery & Thriller", path: "/books/best-sellers/fiction/mystery" },
                    { title: "Science Fiction", path: "/books/best-sellers/fiction/sci-fi" },
                    { title: "Fantasy", path: "/books/best-sellers/fiction/fantasy" },
                ],
            },
            {
                title: "Non-Fiction",
                items: [
                    { title: "Biography", path: "/books/best-sellers/non-fiction/biography" },
                    { title: "Self-Help", path: "/books/best-sellers/non-fiction/self-help" },
                    { title: "History", path: "/books/best-sellers/non-fiction/history" },
                    { title: "Science", path: "/books/best-sellers/non-fiction/science" },
                ],
            },
        ],
    },
    {
        id: "new-arrivals",
        title: "New Arrivals",
        featured: {
            title: "Just Released",
            description: "Hot off the press and ready to read",
            image: "/placeholder.svg?height=200&width=150",
            link: "/books/new/featured",
        },
        sections: [
            {
                title: "Fiction",
                items: [
                    { title: "Literary Fiction", path: "/books/new/fiction/literary" },
                    { title: "Mystery & Thriller", path: "/books/new/fiction/mystery" },
                    { title: "Science Fiction", path: "/books/new/fiction/sci-fi" },
                    { title: "Fantasy", path: "/books/new/fiction/fantasy" },
                ],
            },
            {
                title: "Non-Fiction",
                items: [
                    { title: "Biography", path: "/books/new/non-fiction/biography" },
                    { title: "Self-Help", path: "/books/new/non-fiction/self-help" },
                    { title: "History", path: "/books/new/non-fiction/history" },
                    { title: "Science", path: "/books/new/non-fiction/science" },
                ],
            },
        ],
    },
    {
        id: "genres",
        title: "Genres",
        featured: null,
        sections: [
            {
                title: "Fiction",
                items: [
                    { title: "Literary Fiction", path: "/books/genre/fiction/literary" },
                    { title: "Mystery & Thriller", path: "/books/genre/fiction/mystery" },
                    { title: "Science Fiction", path: "/books/genre/fiction/sci-fi" },
                    { title: "Fantasy", path: "/books/genre/fiction/fantasy" },
                    { title: "Romance", path: "/books/genre/fiction/romance" },
                    { title: "Historical Fiction", path: "/books/genre/fiction/historical" },
                ],
            },
            {
                title: "Non-Fiction",
                items: [
                    { title: "Biography", path: "/books/genre/non-fiction/biography" },
                    { title: "Self-Help", path: "/books/genre/non-fiction/self-help" },
                    { title: "History", path: "/books/genre/non-fiction/history" },
                    { title: "Science", path: "/books/genre/non-fiction/science" },
                    { title: "Business", path: "/books/genre/non-fiction/business" },
                    { title: "Cooking", path: "/books/genre/non-fiction/cooking" },
                ],
            },
        ],
    },
]

const mainNavItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
]

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

const CartButton = () => {
    // This would come from your Redux store in a real implementation
    const cartCount = 3

    return (
        <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">{cartCount}</Badge>
            )}
        </Button>
    )
}

export default function MainLayout() {
    const user = useAppSelector(currentUser)
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleNavigate = (path: string) => {
        navigate(path)
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background">
                <div className="container flex h-16 mx-auto items-center">
                    <div className="flex items-center gap-2">
                        <img src={logo} className="h-10 w-10" alt="Logo" />
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
                                                    {category.sections && (
                                                        <AccordionContent>
                                                            {category.sections.map((section, idx) => (
                                                                <div key={idx} className="mb-4">
                                                                    <h4 className="mb-1 px-2 text-sm font-medium">{section.title}</h4>
                                                                    <div className="space-y-1">
                                                                        {section.items.map((item, itemIdx) => (
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
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </AccordionContent>
                                                    )}
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
                            {megaMenuItems.map((item) => (
                                <NavigationMenuItem key={item.id}>
                                    {item.path ? (
                                        <Link to={item.path} className={navigationMenuTriggerStyle()}>
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-2 lg:w-[800px]">
                                                    {item.featured && (
                                                        <div className="row-span-3 flex flex-col rounded-md bg-muted p-4">
                                                            <div className="mb-2 mt-4 text-lg font-medium">{item.featured.title}</div>
                                                            <p className="mb-4 text-sm leading-tight text-muted-foreground">
                                                                {item.featured.description}
                                                            </p>
                                                            <div className="mt-auto">
                                                                <img
                                                                    src={item.featured.image || "/placeholder.svg"}
                                                                    alt={item.featured.title}
                                                                    className="mx-auto h-[200px] w-auto object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className={cn("grid gap-3", item.featured ? "col-span-1" : "col-span-2")}>
                                                        {item.sections?.map((section, idx) => (
                                                            <div key={idx}>
                                                                <h3 className="mb-2 text-sm font-medium leading-none">{section.title}</h3>
                                                                <ul className="grid grid-cols-2 gap-2">
                                                                    {section.items.map((subItem, subIdx) => (
                                                                        <ListItem key={subIdx} title={subItem.title} href={subItem.path} />
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
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

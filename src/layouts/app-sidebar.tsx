

import { ChevronRight, Home, LogOut, Package, ShoppingCart, User, Users } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Separator } from "../components/ui/separator"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "../components/ui/sidebar"
import logo from "../img/logo.png"
import { currentUser, logOut } from "../redux/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const userRole = {
    ADMIN: "admin",
    USER: "user",
}

export function AppSidebar() {
    const user = useAppSelector(currentUser)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()

    if (!user) {
        return null
    }

    // Navigation items based on user role
    const navigationItems = [
        ...(user.role === userRole.ADMIN
            ? [
                {
                    title: "Dashboard",
                    url: "/admin/dashboard",
                    icon: Home,
                },
                {
                    title: "Manage Books",
                    url: "/admin/manage-books",
                    icon: Package,
                },
                {
                    title: "Manage Orders",
                    url: "/admin/manage-orders",
                    icon: ShoppingCart,
                },
                {
                    title: "Manage Users",
                    url: "/admin/manage-users",
                    icon: Users,
                },
            ]
            : [
                {
                    title: "Dashboard",
                    url: "/user/dashboard",
                    icon: Home,
                },
                {
                    title: "Profile",
                    url: `/user/profile/${user?.id}`,
                    icon: User,
                },
            ]),
        {
            title: "My Orders",
            url: `/orders/${user?.id}`,
            icon: ShoppingCart,
        },
    ]

    const handleLogout = () => {
        dispatch(logOut())
        navigate("/login")
    }

    const handleBackToHome = () => {
        navigate("/")
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex items-center gap-2">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-secondary-foreground">
                                    <img src={logo} className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Book Shop</span>
                                    <span className="truncate text-xs capitalize">{user.role} Panel</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => {
                                const isActive = location.pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                                            <button onClick={() => navigate(item.url)} className="flex items-center gap-2 w-full">
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip="Back to Home">
                                    <button onClick={handleBackToHome} className="flex items-center gap-2 w-full">
                                        <Home className="size-4" />
                                        <span>Back to Home</span>
                                        <ChevronRight className="ml-auto size-4" />
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 px-2 py-1.5">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name || "User"}</span>
                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                    <Separator />
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Logout">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full text-destructive hover:text-destructive"
                            >
                                <LogOut className="size-4" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

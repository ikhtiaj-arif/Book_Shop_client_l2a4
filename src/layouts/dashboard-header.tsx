

import { useLocation } from "react-router-dom"
import { ModeToggle } from "../components/mode-toggle"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Separator } from "../components/ui/separator"
import { SidebarTrigger } from "../components/ui/sidebar"
import { currentUser } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

export function DashboardHeader() {
    const location = useLocation()
    const user = useAppSelector(currentUser)

    // Generate breadcrumbs from current path
    const pathSegments = location.pathname.split("/").filter(Boolean)
    const breadcrumbs = pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/")
        const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
        return { title, path, isLast: index === pathSegments.length - 1 }
    })

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumbs.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    {breadcrumbs.map((breadcrumb) => (
                        <div key={breadcrumb.path} className="flex items-center gap-2">
                            <BreadcrumbItem>
                                {breadcrumb.isLast ? (
                                    <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={breadcrumb.path}>{breadcrumb.title}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!breadcrumb.isLast && <BreadcrumbSeparator />}
                        </div>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
                <span className="text-sm text-muted-foreground">Welcome back, {user?.name}</span>
            </div>
        </header>
    )
}

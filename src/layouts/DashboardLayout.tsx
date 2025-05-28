"use client"

import type React from "react"
import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { DashboardHeader } from "./dashboard-header"


const DashboardLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default DashboardLayout

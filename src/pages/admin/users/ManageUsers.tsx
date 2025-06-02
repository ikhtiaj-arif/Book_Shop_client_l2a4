

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useBlockUserMutation, useGetAllUsersQuery, useUnblockUserMutation } from "@/redux/features/user/userApi"
import {
    Ban,
    Calendar,
    CheckCircle,
    Crown,
    Download,
    Eye,
    Mail,
    MoreVertical,
    Search,
    Shield,
    UserCheck,
    Users,
    UserX,
    XCircle
} from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

// Define the User interface
interface User {
    _id: string
    name: string
    email: string
    role: string
    isBlocked: boolean
    avatar?: string
    createdAt: string
    updatedAt: string
    __v?: number
}

interface UserDetailsProps {
    user: User
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    return (
        <div className="space-y-6">
            {/* User Profile */}
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                        {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2">
                        <Badge variant={user.role === "admin" ? "default" : "secondary"} className="flex items-center gap-1">
                            {user.role === "admin" ? <Crown className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                            {user.role}
                        </Badge>
                        <Badge variant={user.isBlocked ? "destructive" : "default"} className="flex items-center gap-1">
                            {user.isBlocked ? <Ban className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                            {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">User ID:</span>
                            <span className="font-mono text-sm">{user._id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Role:</span>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant={user.isBlocked ? "destructive" : "default"}>
                                {user.isBlocked ? "Blocked" : "Active"}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Member Since:</span>
                            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Account Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Account Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p className="font-medium">Account Created</p>
                                <p className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleString()}</p>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                            <div>
                                <p className="font-medium">Last Profile Update</p>
                                <p className="text-sm text-muted-foreground">{new Date(user.updatedAt).toLocaleString()}</p>
                            </div>
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ManageUsers() {
    const { data: usersData, isLoading, refetch } = useGetAllUsersQuery(undefined)
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation()
    const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation()

    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("All")
    const [statusFilter, setStatusFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
    const [isUnblockDialogOpen, setIsUnblockDialogOpen] = useState(false)
    const [userToBlock, setUserToBlock] = useState<User | null>(null)
    const [userToUnblock, setUserToUnblock] = useState<User | null>(null)

    const users = usersData?.data || []

    // Filter users based on search and filters
    const filteredUsers = users.filter((user: User) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user._id.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = roleFilter === "All" || user.role === roleFilter.toLowerCase()
        const matchesStatus =
            statusFilter === "All" ||
            (statusFilter === "Active" && !user.isBlocked) ||
            (statusFilter === "Blocked" && user.isBlocked)

        return matchesSearch && matchesRole && matchesStatus
    })

    // Pagination
    const usersPerPage = 10
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    // Calculate statistics
    const totalUsers = users.length
    const activeUsers = users.filter((user: User) => !user.isBlocked).length
    const blockedUsers = users.filter((user: User) => user.isBlocked).length
    const adminUsers = users.filter((user: User) => user.role === "admin").length

    const handleViewDetails = (user: User) => {
        setSelectedUser(user)
        setIsDetailsOpen(true)
    }

    const handleBlockUser = async () => {
        if (!userToBlock) return

        try {
            await blockUser({ id: userToBlock._id }).unwrap()
            toast.success("User blocked successfully!")
            setIsBlockDialogOpen(false)
            setUserToBlock(null)
            refetch()
        } catch (error) {
            toast.error("Failed to block user")
            console.error("Error blocking user:", error)
        }
    }

    const handleUnblockUser = async () => {
        if (!userToUnblock) return

        try {
            await unblockUser({ id: userToUnblock._id }).unwrap()
            toast.success("User unblocked successfully!")
            setIsUnblockDialogOpen(false)
            setUserToUnblock(null)
            refetch()
        } catch (error) {
            toast.error("Failed to unblock user")
            console.error("Error unblocking user:", error)
        }
    }

    const handleOpenBlockDialog = (user: User) => {
        setUserToBlock(user)
        setIsBlockDialogOpen(true)
    }

    const handleOpenUnblockDialog = (user: User) => {
        setUserToUnblock(user)
        setIsUnblockDialogOpen(true)
    }

    const getStatusVariant = (isBlocked: boolean) => {
        return isBlocked ? "destructive" : "default"
    }

    const getRoleVariant = (role: string) => {
        return role === "admin" ? "default" : "secondary"
    }

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading users...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
                    <p className="text-muted-foreground">View and manage all user accounts and their permissions</p>
                </div>
                {/* <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button> */}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">All registered users</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                        <p className="text-xs text-muted-foreground">Currently active accounts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
                        <UserX className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{blockedUsers}</div>
                        <p className="text-xs text-muted-foreground">Blocked accounts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{adminUsers}</div>
                        <p className="text-xs text-muted-foreground">Administrator accounts</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search by name, email, or user ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter by Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Roles</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Blocked">Blocked</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Join Date</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No users found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedUsers.map((user: User) => (
                                        <TableRow key={user._id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback>
                                                            {user.name
                                                                ?.split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase() || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground font-mono">{user._id.slice(-8)}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={getRoleVariant(user.role)} className="flex items-center gap-1 w-fit">
                                                    {user.role === "admin" ? <Crown className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(user.isBlocked)} className="flex items-center gap-1 w-fit">
                                                    {user.isBlocked ? <XCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                                                    {user.isBlocked ? "Blocked" : "Active"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>{new Date(user.updatedAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        {user.role !== "admin" && (
                                                            <>
                                                                {!user.isBlocked ? (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleOpenBlockDialog(user)}
                                                                        className="text-red-600 focus:text-red-600"
                                                                    >
                                                                        <Ban className="h-4 w-4 mr-2" />
                                                                        Block User
                                                                    </DropdownMenuItem>
                                                                ) : (
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleOpenUnblockDialog(user)}
                                                                        className="text-green-600 focus:text-green-600"
                                                                    >
                                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                                        Unblock User
                                                                    </DropdownMenuItem>
                                                                )}
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                                if (pageNum <= totalPages) {
                                    return (
                                        <PaginationItem key={pageNum}>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    setCurrentPage(pageNum)
                                                }}
                                                isActive={currentPage === pageNum}
                                            >
                                                {pageNum}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                }
                                return null
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* User Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    {selectedUser && <UserDetails user={selectedUser} />}
                </DialogContent>
            </Dialog>

            {/* Block User Confirmation Dialog */}
            <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Block User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to block "{userToBlock?.name}"? This will prevent them from accessing their account
                            and using the service.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleBlockUser} className="bg-red-600 hover:bg-red-700" disabled={isBlocking}>
                            {isBlocking ? "Blocking..." : "Block User"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Unblock User Confirmation Dialog */}
            <AlertDialog open={isUnblockDialogOpen} onOpenChange={setIsUnblockDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Unblock User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to unblock "{userToUnblock?.name}"? This will restore their access to their account
                            and the service.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleUnblockUser}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={isUnblocking}
                        >
                            {isUnblocking ? "Unblocking..." : "Unblock User"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

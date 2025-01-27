import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = () => {
// const Sidebar = ({ isOpen, toggleSidebar }) => {
  // const user = useAppSelector(currentUser);
  // const navigate = useNavigate();

  // if (!user) return null; // Do not render the sidebar if no user

  // const sidebarItems =
  //   user?.role === userRole.ADMIN
  //     ? [
  //       { key: "1", label: "Admin Dashboard", path: "/admin" },
  //       { key: "2", label: "Manage Products", path: "/admin/products" },
  //       { key: "3", label: "Orders", path: "/admin/orders" },
  //       { key: "4", label: "Users", path: "/admin/users" },
  //     ]
  //     : [
  //       { key: "1", label: "User Dashboard", path: "/user/dashboard" },
  //       { key: "2", label: "Profile", path: "/user/profile" },
  //       { key: "3", label: "Orders", path: "/user/orders" },
  //     ];

  return (
    //   <aside
    //   className={`fixed lg:sticky top-0 left-0 h-screen w-64 z-40 transition-transform transform ${
    //     isOpen ? "translate-x-0" : "-translate-x-full"
    //   } lg:translate-x-0`}
    //   style={{
    //     backgroundColor: "hsl(var(--card))",
    //     color: "hsl(var(--card-foreground))",
    //   }}
    // >
    //   {/* Sidebar Header */}
    //   <Card
    //     className="h-full"
    //     style={{
    //       backgroundColor: "hsl(var(--card))",
    //       color: "hsl(var(--card-foreground))",
    //     }}
    //   >
    //     <CardHeader
    //       className="border-b"
    //       style={{ borderColor: "hsl(var(--border))" }}
    //     >
    //       <CardTitle className="flex items-center justify-between px-4 h-16">
    //         {user?.role === userRole.ADMIN ? "Admin Panel" : "User Panel"}
    //         {/* Close button for mobile */}
    //         <X
    //           className="lg:hidden text-2xl cursor-pointer"
    //           onClick={toggleSidebar}
    //           style={{ color: "hsl(var(--foreground))" }}
    //         />
    //       </CardTitle>
    //     </CardHeader>

    //     {/* Sidebar Items */}
    //     <CardContent className="flex flex-col gap-2 p-4">
    //       {sidebarItems.map((item) => (
    //         <Button
    //           key={item.key}
    //           variant="ghost"
    //           className="justify-start w-full text-left"
    //           style={{
    //             color: "hsl(var(--foreground))",
    //             backgroundColor: "hsl(var(--card))",
    //           }}
    //           onClick={() => {
    //             navigate(item.path);
    //             toggleSidebar(); // Close the sidebar on mobile
    //           }}
    //           onMouseEnter={(e) =>
    //             (e.currentTarget.style.backgroundColor = "hsl(var(--muted))")
    //           }
    //           onMouseLeave={(e) =>
    //             (e.currentTarget.style.backgroundColor = "hsl(var(--card))")
    //           }
    //         >
    //           {item.label}
    //         </Button>
    //       ))}
    //     </CardContent>
    //   </Card>
    // </aside>
    // <aside
    // className={`sticky top-0 left-0  w-64 z-40 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
    // }  bg-card text-card-foreground`}
    // >
    //   {/* Sidebar Header */}
    //   <Card className="h-full bg-card text-card-foreground">
    //     <CardHeader className="border-b border-border">
    //       <CardTitle className="flex items-center justify-between px-4 h-16">
    //         {user?.role === userRole.ADMIN ? "Admin Panel" : "User Panel"}
    //         {/* Close button for mobile */}
    //         <X
    //           className="lg:hidden text-2xl cursor-pointer text-foreground"
    //           onClick={toggleSidebar}
    //         />
    //       </CardTitle>
    //     </CardHeader>

    //     {/* Sidebar Items */}
    //     <CardContent className="flex flex-col gap-2 p-4">
    //       {sidebarItems.map((item) => (
    //         <Button
    //           key={item.key}
    //           variant="ghost"
    //           className="justify-start w-full text-left text-foreground bg-card hover:bg-muted"
    //           onClick={() => {
    //             navigate(item.path);
    //             toggleSidebar(); // Close the sidebar on mobile
    //           }}
    //         >
    //           {item.label}
    //         </Button>
    //       ))}
    //     </CardContent>
    //   </Card>
    // </aside>
    <aside>

    </aside>
  );
};

export default Sidebar;
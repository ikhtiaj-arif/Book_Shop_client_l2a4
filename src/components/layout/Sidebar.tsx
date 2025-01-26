import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Close icon for mobile
import { currentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();

  if (!user) return null; // Do not render the sidebar if no user

  const sidebarItems =
    user?.role === userRole.ADMIN
      ? [
          { key: "1", label: "Admin Dashboard", path: "/admin" },
          { key: "2", label: "Manage Products", path: "/admin/products" },
          { key: "3", label: "Orders", path: "/admin/orders" },
          { key: "4", label: "Users", path: "/admin/users" },
        ]
      : [
          { key: "1", label: "User Dashboard", path: "/user/dashboard" },
          { key: "2", label: "Profile", path: "/user/profile" },
          { key: "3", label: "Orders", path: "/user/orders" },
        ];

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 h-full bg-gray-900 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 w-64 z-40`}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
        <span className="text-xl font-bold">
          {user?.role === userRole.ADMIN ? "Admin Panel" : "User Panel"}
        </span>
        {/* Close button for mobile */}
        <X
          className="lg:hidden text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar Items */}
      <nav className="flex flex-col p-4 gap-2">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              navigate(item.path);
              toggleSidebar(); // Close the sidebar on mobile
            }}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

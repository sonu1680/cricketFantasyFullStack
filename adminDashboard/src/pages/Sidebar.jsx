import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart2,
  Wallet,
  ArrowRightLeft,
  MessageSquare,
  Heart,
  User,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Swords,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    items: [
      { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
      {
        icon: <Swords size={20} />,
        label: "Create Match",
        path: "/createMatch",
      },
      {
        icon: <Trophy size={20} />,
        label: "Create Contest",
        path: "/contestHome",
      },
      {
        icon: <User size={20} />,
        label: "Users",
        path: "/users",
      },

    ],
  },
  {
    items: [
      { icon: <HelpCircle size={20} />, label: "Support"},
      { icon: <Settings size={20} />, label: "Settings" },
      { icon: <LogOut size={20} />, label: "Logout"  },
    ],
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const isActive = (path) => location.pathname === path; // Function to check if the path is active

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-white transition-all duration-300 ease-in-out",
          "flex flex-col border-r shadow-lg",
          isOpen ? "w-64" : "w-20",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center h-16 px-4",
            isOpen ? "justify-between" : "justify-center"
          )}
        >
          {isOpen && (
            <div className="font-bold text-xl p-4 mt-5">
              <img src="./logo.png" alt="" className="w-20 h-20" />
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 hidden lg:block"
          >
            {/* {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />} */}
          </button>

          <button
            onClick={toggleMobileSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {menuItems.map((section, idx) => (
            <div key={idx} className="mb-6">
              {isOpen && (
                <div className="px-4 mb-2 text-sm text-gray-500">
                  {section.title}
                </div>
              )}

              <div className="space-y-1">
                {section.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center w-full p-2 rounded-lg transition-colors",
                      "hover:bg-gray-100 active:bg-gray-200",
                      isActive(item.path)
                        ? "bg-blue-100 text-blue-700" // Apply active styles if the item is active
                        : "text-gray-700 hover:text-gray-900",
                      isOpen ? "justify-start" : "justify-center"
                    )}
                  >
                    <div
                      className={cn("flex items-center", isOpen && "w-full")}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center",
                          isOpen && "mr-3"
                        )}
                      >
                        {item.icon}
                      </div>

                      {isOpen && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div
          className={cn(
            "border-t p-4",
            isOpen ? "flex items-center" : "flex flex-col items-center"
          )}
        >
          <div className="w-14 h-14 rounded-full bg-gray-200 mb-2">
            <img
              src="https://res.cloudinary.com/deboz17jx/image/upload/v1730534106/sonu_nwlilo.jpg"
              alt="Sonu Pandit"
              className="rounded-full"
            />
          </div>
          {isOpen && (
            <div className="ml-3">
              <div className="text-sm font-medium">Sonu Pandit</div>
              <div className="text-xs text-gray-500">
                sonupandit1680@gmail.com
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Calendar,
  Settings,
  Receipt,
  User,
  LogOut,
  ChevronUp,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/hook";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Accounts", href: "/accounts", icon: Building2 },
  { name: "Cards", href: "/cards", icon: CreditCard },
  { name: "EMI Tracker", href: "/emi", icon: Wallet },
  { name: "Monthly Tabs", href: "/monthly", icon: Calendar },
  { name: "Preferences", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSettings = () => {
    navigate("/settings");
  };
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              ExpenseTracker
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Smart Finance Manager
            </p>
          </div>
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4 md:h-5 md:w-5 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 md:p-4 rounded-lg mb-4">
            <p className="text-xs md:text-sm font-medium">Monthly Budget</p>
            <p className="text-xs opacity-90 mt-1">₹45,000 / ₹50,000</p>
            <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between h-auto p-2 md:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                <Avatar className="h-6 w-6 md:h-8 md:w-8 shrink-0">
                  <AvatarImage src="/placeholder.svg" alt="John Doe" />
                  <AvatarFallback className="bg-blue-600 text-white text-xs md:text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                    {user?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate hidden md:block">
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>
              <ChevronUp className="h-3 w-3 md:h-4 md:w-4 text-gray-400 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" align="end" side="top">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleProfile}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSettings}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

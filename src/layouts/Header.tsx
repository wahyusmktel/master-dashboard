import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Command,
  User,
  Settings,
  HelpCircle,
  LogOut, // Import ikon-ikon baru
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navItems } from "@/config/menu";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-md lg:px-6">
      {/* --- MOBILE SIDEBAR TRIGGER --- */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden rounded-full hover:bg-slate-100 w-10 h-10"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-slate-600" />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex flex-col w-[300px] sm:w-[350px]"
        >
          <SheetHeader className="mb-6 text-left">
            <SheetTitle className="flex items-center gap-3 font-bold text-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-500/30">
                <Command className="h-5 w-5" />
              </div>
              Master Menu
            </SheetTitle>
          </SheetHeader>

          <nav className="grid gap-2 text-lg font-medium">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                    isActive
                      ? "bg-red-50 text-red-600 font-bold"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pb-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 rounded-xl py-6 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />{" "}
              {/* Tambah Icon Logout di Mobile juga */}
              <span className="font-bold">Log Out</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">{/* Spacer */}</div>

      {/* --- USER PROFILE DROPDOWN (UPDATED) --- */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 border border-slate-200 shadow-sm focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>

        {/* Konten Dropdown Disesuaikan dengan Referensi Gambar */}
        <DropdownMenuContent
          align="end"
          className="w-72 rounded-xl shadow-xl p-2 mt-2"
        >
          {/* Header Info User */}
          <DropdownMenuLabel className="p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-base font-bold text-slate-900 leading-none">
                Wahyu Ganteng
              </p>
              <p className="text-sm font-normal text-slate-500 leading-none">
                admin@master.com
              </p>
            </div>
          </DropdownMenuLabel>

          <div className="px-2 pb-2">
            <DropdownMenuSeparator className="bg-slate-100" />
          </div>

          {/* Menu Items Group */}
          <div className="space-y-1 px-1">
            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:bg-slate-50 transition-colors">
              <User className="h-5 w-5 text-slate-400" />
              Edit profile
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:bg-slate-50 transition-colors">
              <Settings className="h-5 w-5 text-slate-400" />
              Account settings
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-slate-50 focus:bg-slate-50 transition-colors">
              <HelpCircle className="h-5 w-5 text-slate-400" />
              Support
            </DropdownMenuItem>
          </div>

          <div className="p-2">
            <DropdownMenuSeparator className="bg-slate-100" />
          </div>

          {/* Sign Out Button */}
          <div className="px-1 pb-1">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-slate-700 font-medium hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600 transition-colors group"
            >
              <LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-600 group-focus:text-red-600" />
              Sign out
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

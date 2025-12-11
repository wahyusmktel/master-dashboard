import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom";
import { Menu, X, Command } from "lucide-react"; // Import icon X (Silang)
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
import { motion, AnimatePresence } from "framer-motion"; // Import animasi

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // State untuk mengontrol Sheet (Menu Mobile)
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    // FIX: Tinggi dibuat fix h-[60px] biar sejajar sama Sidebar
    <header className="sticky top-0 z-50 flex h-[60px] items-center gap-4 border-b bg-white/80 px-4 backdrop-blur-md lg:px-6">
      {/* --- ANIMATED MOBILE MENU BUTTON --- */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {/* Ganti variant jadi 'ghost' biar clean (gak ada border kotak), size agak gedean */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden rounded-full hover:bg-slate-100 w-10 h-10"
          >
            {/* Logika Animasi: Kalau open putar 90 derajat dan ganti icon */}
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

        {/* Isi Sidebar Mobile */}
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
                  onClick={() => setIsOpen(false)} // Tutup menu pas diklik
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
              <span className="ml-1 font-bold">Log Out</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="w-full flex-1">{/* Placeholder search bar */}</div>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 border border-slate-200 shadow-sm"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-xl shadow-lg p-2"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Wahyu Ganteng</p>
              <p className="text-xs leading-none text-muted-foreground">
                admin@master.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 font-bold cursor-pointer rounded-lg"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

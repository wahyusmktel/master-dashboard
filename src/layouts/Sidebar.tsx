import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Command, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { navItems, NavItem } from "@/config/menu";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <TooltipProvider delayDuration={0}>
      {/* FIX: 
         1. 'sticky top-0 h-screen': Bikin sidebar nempel & setinggi layar full.
         2. 'border-r': Garis batas kanan.
      */}
      <aside
        className={cn(
          "sticky top-0 h-screen border-r bg-slate-50/40 transition-all duration-300 ease-in-out hidden lg:flex lg:flex-col dark:bg-slate-800/40",
          isCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        {/* HEADER SIDEBAR (Fixed Height 60px) */}
        <div
          className={cn(
            "flex h-[60px] shrink-0 items-center border-b px-6",
            isCollapsed ? "justify-center px-2" : ""
          )}
        >
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-slate-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-md shadow-red-500/20">
              <Command className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <span className="text-lg whitespace-nowrap opacity-100 transition-opacity duration-300">
                Master Panel
              </span>
            )}
          </Link>
        </div>

        {/* MENU ITEMS (Flex-1 biar ngisi ruang kosong, Scrollable) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <nav className="grid gap-2 px-2">
            {navItems.map((item, index) => (
              <SidebarItem key={index} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>

        {/* FOOTER & TOGGLE BUTTON (Selalu di Bawah / mt-auto) */}
        <div className="mt-auto shrink-0 p-4 border-t bg-slate-50/50 flex flex-col gap-2">
          {/* Info Versi (Hanya muncul kalau Expanded) */}
          {!isCollapsed && (
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-xs text-slate-500 mb-2 animate-in fade-in slide-in-from-bottom-2">
              <p className="font-bold text-slate-900">Master Template</p>
              <p>Production Ready v2.1</p>
            </div>
          )}

          {/* Tombol Toggle Sidebar */}
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="sm"
            className={cn(
              "w-full rounded-lg border-slate-200 hover:bg-red-50 hover:text-red-600 transition-colors",
              isCollapsed ? "h-10 w-10 p-0 mx-auto" : "flex justify-between"
            )}
          >
            {!isCollapsed && <span className="ml-2">Sembunyikan Menu</span>}
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

// --- KOMPONEN SidebarItem (SAMA SEPERTI SEBELUMNYA, TIDAK BERUBAH) ---
function SidebarItem({
  item,
  isCollapsed,
}: {
  item: NavItem;
  isCollapsed: boolean;
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive =
    item.href === location.pathname ||
    item.children?.some((child) => child.href === location.pathname);

  if (isCollapsed) {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            {item.children ? (
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-xl mx-auto",
                    isActive && "bg-red-50 text-red-600"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
            ) : (
              <Link
                to={item.href}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl mx-auto transition-colors hover:bg-slate-100 hover:text-red-600",
                  isActive ? "bg-red-50 text-red-600" : "text-slate-500"
                )}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="font-semibold"
            sideOffset={10}
          >
            {item.title}
          </TooltipContent>
        </Tooltip>
        {item.children && (
          <DropdownMenuContent
            side="right"
            align="start"
            className="w-48 ml-2 rounded-xl"
          >
            <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {item.children.map((child, idx) => {
              const isChildActive = child.href === location.pathname;
              return (
                <DropdownMenuItem key={idx} asChild>
                  <Link
                    to={child.href}
                    className={cn(
                      "cursor-pointer flex items-center gap-2",
                      isChildActive && "text-red-600 font-bold"
                    )}
                  >
                    <child.icon className="h-4 w-4" />
                    {child.title}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    );
  }

  if (item.children) {
    return (
      <Collapsible
        open={isOpen || isActive}
        onOpenChange={setIsOpen}
        className="space-y-1"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-between rounded-xl px-3 py-6 hover:bg-slate-100",
              isActive ? "text-red-600 bg-red-50/50" : "text-slate-500"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen ? "rotate-180" : ""
              )}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-4 animate-slide-down">
          <div className="border-l-2 border-slate-100 pl-2 space-y-1 mt-1">
            {item.children.map((child, idx) => {
              const isChildActive = child.href === location.pathname;
              return (
                <Link
                  key={idx}
                  to={child.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isChildActive
                      ? "text-red-600 font-bold bg-red-50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  <child.icon className="h-4 w-4" />
                  {child.title}
                </Link>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 font-medium transition-all duration-300",
        isActive
          ? "bg-red-50 text-red-600 shadow-sm"
          : "text-slate-500 hover:bg-slate-100 hover:text-red-600"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.title}</span>
    </Link>
  );
}

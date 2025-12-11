import {
  LayoutDashboard,
  Users,
  Settings,
  FolderKanban,
  Shield,
  UserPlus,
  List,
  Table as TableIcon,
} from "lucide-react";

// Definisikan tipe data menu biar aman
export type NavItem = {
  title: string;
  href: string;
  icon: any;
  children?: NavItem[]; // Optional: Bisa punya anak menu
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // CONTOH MENU DENGAN SUBMENU
  {
    title: "User Management",
    href: "#", // Parent gak punya link langsung biasanya
    icon: Users,
    children: [
      {
        title: "List Users",
        href: "/dashboard/users",
        icon: List,
      },
      {
        title: "Create User",
        href: "/dashboard/users/create",
        icon: UserPlus,
      },
      {
        title: "Roles & Permission",
        href: "/dashboard/users/roles",
        icon: Shield,
      },
    ],
  },
  {
    title: "Data Master",
    href: "/dashboard/table",
    icon: TableIcon, // Pakai icon Table
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

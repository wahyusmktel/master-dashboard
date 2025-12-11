import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SidebarProvider } from "@/hooks/useSidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
}

function MainLayoutContent() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      {/* Sidebar (Sudah Sticky di Sidebar.tsx) */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex flex-1 flex-col">
        <Header />

        {/* FIX: Hapus 'max-w-7xl' dan 'mx-auto' agar full width */}
        <main className="flex-1 p-4 lg:p-8 w-full">
          {" "}
          {/* Padding lg:p-8 sudah cukup jadi batas */}
          <div className="w-full animate-in fade-in zoom-in-95 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const isAuthenticated = localStorage.getItem("token");

  // LOGIKA:
  // Kalau user SUDAH login (ada token), jangan kasih masuk sini,
  // langsung lempar ke dashboard.
  // Kalau BELUM login, baru boleh lihat halamannya (Outlet).
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

# 🚀 Master Dashboard Pro - React TypeScript

![Master Dashboard Banner](./docs/dashboard-preview.png)

> **Modern, Scalable, and Production-Ready Dashboard Boilerplate.**
> Dibangun dengan teknologi web modern untuk mempercepat pengembangan aplikasi Enterprise.

[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)

## ✨ Fitur Unggulan

Template ini sudah dilengkapi dengan fitur-fitur esensial yang siap pakai:

### 🛡️ Authentication & Security

- **Secure Login Page:** Desain split-screen modern dengan animasi gradient & validasi form.
- **Auth Guard (Protected Routes):** Mencegah akses tanpa token.
- **Guest Guard (Public Routes):** Redirect otomatis jika user sudah login.
- **Logout Handling:** Manajemen sesi yang aman.

### 🎨 UI & UX Experience

- **Modern Sidebar:** Collapsible, responsive, dan support multi-level menu (hybrid navigation).
- **Dark Mode Support:** Tema gelap/terang terintegrasi penuh (system & manual switch).
- **Interactive Widgets:**
  - 📈 **Revenue Chart:** Area chart modern dengan efek gradasi (ApexCharts).
  - 🚚 **Order Tracking:** Widget tracking status pengiriman dengan timeline vertikal.
  - 📅 **Agenda & Calendar:** Manajemen jadwal harian dengan indikator "Live Event".
- **Top Bar Notification:** Popover notifikasi interaktif dengan status indikator.

### 📊 Advanced Data Table

Ditenagai oleh **TanStack Table (React Table v8)**:

- ✅ **Selection:** Checkbox massal & per baris.
- 🔍 **Smart Filtering:** Search realtime & filter berdasarkan status.
- 📄 **Pagination:** Custom pagination (10, 20, 50, 100 rows).
- ⚙️ **Actions:** Dropdown menu untuk Edit, Delete, dan View Detail.
- 🗑️ **Bulk Delete:** Konfirmasi hapus data massal dengan Alert Dialog.
- ⏳ **Skeleton Loading:** Animasi loading state yang smooth.

### 👤 Profile Management

- **Profile Page:** Desain header full-width gradient.
- **Tabs Navigation:** Pemisahan General Info & Security.
- **Forms:** Layout form yang rapi dan responsif.

---

## 🛠️ Tech Stack

Project ini dibangun menggunakan library terbaik di kelasnya:

- **Core:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, PostCSS
- **UI Components:** shadcn/ui (Radix UI based)
- **Icons:** Lucide React
- **Routing:** React Router DOM v6
- **Data Display:** TanStack Table v8
- **Charts:** ApexCharts / React-ApexCharts
- **Date Handling:** date-fns, React Day Picker
- **Animation:** Framer Motion, Tailwind Animate
- **Form Handling:** React Hook Form + Zod (Validation)

---

## 🚀 Cara Instalasi

Ikuti langkah ini untuk menjalankan project di lokal:

1.  **Clone Repository**

    ```bash
    git clone [https://github.com/wahyusmktel/master-dashboard-ts.git](https://github.com/wahyusmktel/master-dashboard-ts.git)
    cd master-dashboard-ts
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Jalankan Development Server**

    ```bash
    npm run dev
    ```

4.  **Buka di Browser**
    Akses `http://localhost:5173`

---

## 📂 Struktur Folder

Arsitektur folder dirancang menggunakan pendekatan **Feature-Based** agar mudah diskalakan.

```text
src/
├── components/         # Komponen Reusable (Button, Input, dll)
│   ├── shared/         # Widget khusus (Chart, Calendar, Tracking)
│   └── ui/             # Komponen shadcn
├── config/             # Konfigurasi Menu & App
├── features/           # Modul fitur (Auth, Users, dll) - Optional
├── hooks/              # Custom Hooks (useSidebar, useTheme)
├── layouts/            # Layout Utama (Sidebar, Header, MainLayout)
├── lib/                # Utilities (cn, utils)
├── pages/              # Halaman Aplikasi (Login, Dashboard, Profile, Table)
├── router/             # Konfigurasi Routing & Guards
└── main.tsx            # Entry Point
```

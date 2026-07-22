"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen overflow-hidden bg-slate-100 dark:bg-[#0f172a]">

      {/* Navbar - Sticky at top full-width */}
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Below Navbar: Sidebar + Main Content */}
      <div className="flex h-[calc(100vh-4rem)] relative">

        {/* Sidebar - Fixed below Navbar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content Area - Scrollable with custom scrollbar */}
        <main
          className={`flex-1 overflow-y-auto custom-scrollbar bg-slate-100 dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 transition-all duration-300 ${
            sidebarOpen ? "lg:ml-72" : "ml-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-8 py-8">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

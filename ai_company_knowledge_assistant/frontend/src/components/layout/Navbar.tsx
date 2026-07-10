"use client";

import Link from "next/link";
import {
  FiMenu,
  FiMessageSquare,
  FiFileText,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between relative z-50">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FiMenu size={22} />
        </button>

        {/* Quick Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href="/chat"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FiMessageSquare size={16} />
            AI Assistant
          </Link>

          <Link
            href="/documents"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FiFileText size={16} />
            Documents
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FiBarChart2 size={16} />
            Analytics
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FiSettings size={16} />
            Settings
          </Link>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-800">
            Welcome, Employee
          </p>

          <p className="text-xs text-gray-500">
            Xeven Solutions
          </p>
        </div>

        <Link
          href="/profile"
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          F
        </Link>
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FiMenu size={22} />
        </button>

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
            X
          </div>

          <span className="hidden md:block text-lg font-semibold text-gray-900">
            Xeven Solutions
          </span>

        </Link>

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
          className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold hover:bg-blue-700 transition"
        >
          F
        </Link>

      </div>

    </header>
  );
}
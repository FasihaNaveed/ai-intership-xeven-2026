"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiMessageSquare,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiClock,
  FiShield,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: FiHome,
    href: "/dashboard",
  },
  {
    title: "AI Assistant",
    icon: FiMessageSquare,
    href: "/chat",
  },
  {
    title: "Documents",
    icon: FiFileText,
    href: "/documents",
  },
  {
    title: "Conversations",
    icon: FiClock,
    href: "/conversations",
  },
  {
    title: "Analytics",
    icon: FiBarChart2,
    href: "/analytics",
  },
  {
    title: "Audit Logs",
    icon: FiShield,
    href: "/audit-logs",
  },
  {
    title: "Settings",
    icon: FiSettings,
    href: "/settings",
  },
  {
    title: "Profile",
    icon: FiUser,
    href: "/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-slate-800">
        <h1 className="text-lg font-bold">
          AI Knowledge Assistant
        </h1>

        <p className="text-slate-400 text-xs mt-1">
          Enterprise Internal Knowledge Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-xs text-slate-400">
            Logged in as
          </p>

          <p className="font-semibold text-sm mt-1">
            Employee
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Xeven Solutions
          </p>
        </div>
      </div>
    </aside>
  );
}
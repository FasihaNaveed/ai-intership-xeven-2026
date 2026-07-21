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

const menuSections = [
  {
    title: "WORKSPACE",
    items: [
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
        title: "Conversations",
        icon: FiClock,
        href: "/conversations",
      },
    ],
  },
  {
    title: "KNOWLEDGE",
    items: [
      {
        title: "Documents",
        icon: FiFileText,
        href: "/documents",
      },
      {
        title: "Analytics",
        icon: FiBarChart2,
        href: "/analytics",
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
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
    ],
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  sidebarOpen,
}: SidebarProps) {

  const pathname = usePathname();

  return (

    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-800 text-white transition-transform duration-300 ${sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
        }`}
    >

      <div className="flex h-screen flex-col">

        {/* LOGO */}

        <div className="border-b border-slate-800 px-5 py-2.5">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
              AI
            </div>

            <div>

              <h1 className="text-[15px] font-bold leading-tight">
                AI Knowledge Assistant
              </h1>

              <p className="text-[11px] text-slate-400">
                Enterprise Workspace
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}

        <div className="flex-1 overflow-hidden px-4 py-1.5">

          {menuSections.map((section) => (

            <div
              key={section.title}
              className="mb-3"
            >

              <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                {section.title}
              </p>

              <div className="space-y-0.5">

                {section.items.map((item) => {

                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href;

                  return (

                    <Link
                      key={item.title}
                      href={item.href}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-1.5 transition-all duration-200 ${isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                        }`}
                    >

                      <div className="flex items-center gap-3">

                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-white"
                          }
                        />

                        <span className="text-sm font-medium">
                          {item.title}
                        </span>

                      </div>

                      {isActive && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}

                    </Link>

                  );

                })}

              </div>

            </div>

          ))}

        </div>

        {/* USER PANEL */}

        <div className="shrink-0 border-t border-slate-800 bg-slate-950 px-4 py-2.5">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Logged In
          </p>

          <div className="mt-2 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
              F
            </div>

            <div>

              <p className="text-sm font-semibold text-white">
                Fasiha Naveed
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>

            </div>

          </div>

          <div className="mt-2 rounded-xl bg-slate-900 p-2">

            <p className="text-xs text-slate-500">
              Organization
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Xeven Solutions
            </p>

          </div>

        </div>

      </div>

    </aside>

  );
}


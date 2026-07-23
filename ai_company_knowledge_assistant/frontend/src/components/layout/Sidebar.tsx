"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiMessageSquare,
  FiFileText,
  FiBarChart2,
  FiSettings,
  FiClock,
  FiShield,
  FiBookOpen,
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
        title: "Knowledge Base",
        icon: FiBookOpen,
        href: "/knowledge-base",
      },
      {
        title: "Usage Insights",
        icon: FiBarChart2,
        href: "/analytics",
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        title: "Access Audit",
        icon: FiShield,
        href: "/audit-logs",
      },
      {
        title: "Settings",
        icon: FiSettings,
        href: "/settings",
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
      className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-72 bg-slate-950 border-r border-slate-800 text-white transition-transform duration-300 dark:bg-[#0B0F19] dark:border-slate-800 ${
        sidebarOpen
          ? "translate-x-0"
          : "-translate-x-full"
        }`}
    >

      <div className="flex h-full flex-col">

        {/* MENU */}

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">

          {menuSections.map((section) => (

            <div
              key={section.title}
              className="mb-4"
            >

              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
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
                      className={`group flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-500/10 text-blue-400 font-semibold shadow-sm shadow-blue-900/10 border border-blue-500/20"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
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

      </div>

    </aside>

  );
}


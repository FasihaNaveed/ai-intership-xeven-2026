"use client";

import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiChevronRight,
} from "react-icons/fi";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {

  const pathname = usePathname();

  const pageName =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname
          .replace("/", "")
          .replace("-", " ");

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (

    <header className="sticky top-0 z-30 h-20 w-full border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="flex h-full items-center justify-between px-8">

        {/* LEFT */}

        <div className="flex items-center gap-5">

          <button
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100"
          >
            <FiMenu size={20} />
          </button>

          <div>

            <div className="flex items-center text-sm text-slate-500">

              <span>Workspace</span>

              <FiChevronRight className="mx-2" />

              <span className="capitalize">
                {pageName}
              </span>

            </div>

            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {pageName}
            </h1>

          </div>

        </div>

        {/* SEARCH */}

        <div className="hidden xl:flex flex-1 justify-center px-12">

          <div className="relative w-full max-w-xl">

            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search here"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          <div className="hidden lg:block text-right">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Today
            </p>

            <p className="text-sm font-semibold text-slate-700">
              {today}
            </p>

          </div>

          <button className="relative rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">

            <FiBell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>

          <button className="rounded-xl border border-slate-200 bg-white p-3 transition hover:bg-slate-100">

            <FiHelpCircle size={18} />

          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white">
              F
            </div>

            <div className="hidden md:block">

              <p className="text-sm font-semibold text-slate-900">
                Fasiha Naveed
              </p>

              <p className="text-xs text-slate-500">
                Employee • Xeven Solutions
              </p>

            </div>

          </div>

        </div>

      </div>

    </header>

  );
}
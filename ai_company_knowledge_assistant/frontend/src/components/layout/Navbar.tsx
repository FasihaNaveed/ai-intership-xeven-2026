"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiMenu,
  FiBell,
  FiHelpCircle,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiMail,
  FiShield,
  FiSettings,
  FiSun,
  FiMoon,
  FiX,
  FiClock,
  FiAlertCircle,
  FiCheckCircle,
  FiBookOpen,
  FiSearch,
  FiMessageSquare,
  FiFileText,
} from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import {
  getNotifications,
  markAsRead,
  markAllAsRead as markAllReadApi,
  getUnreadCount,
  NotificationItem,
} from "@/services/notificationsService";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

interface UserData {
  id: number;
  full_name: string;
  email: string;
  role: string;
  organization: string;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpQuery, setHelpQuery] = useState("");
  const [helpSubmitted, setHelpSubmitted] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  // Dynamic notifications from backend API
  const [allNotifications, setAllNotifications] = useState<NotificationItem[]>([]);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const [notifTab, setNotifTab] = useState<"all" | "unread">("all");
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    try {
      const notifs = await getNotifications();
      setAllNotifications(notifs);
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  useEffect(() => {
    if (notificationsOpen) {
      loadNotifications();
    }
  }, [notificationsOpen]);

  const markAllAsRead = async () => {
    try {
      await markAllReadApi();
      setReadIds(new Set(allNotifications.map((n) => n.id)));
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const toggleRead = async (id: number) => {
    try {
      await markAsRead(id);
      setReadIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const filteredNotifications = allNotifications.filter((n) => {
    if (notifTab === "unread") return !readIds.has(n.id) && !n.is_read;
    return true;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(target)) setNotificationsOpen(false);
      if (helpRef.current && !helpRef.current.contains(target)) setHelpOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pageName =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/chat"
      ? "AI Assistant"
      : pathname === "/conversations"
      ? "Conversations"
      : pathname === "/documents"
      ? "Documents"
      : pathname === "/analytics"
      ? "Usage Insights"
      : pathname === "/audit-logs"
      ? "Access Audit"
      : pathname === "/settings"
      ? "Settings"
      : pathname === "/profile"
      ? "Profile"
      : pathname === "/knowledge-base"
      ? "Knowledge Base"
      : pathname.replace("/", "").replace("-", " ");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const userInitial = user?.full_name?.charAt(0)?.toUpperCase() || "U";

  const getNotifIcon = (notification: NotificationItem) => {
    const type = notification.type;
    if (type === "info" || type === "indexed") return <FiFileText size={14} className="text-blue-500" />;
    if (type === "alert" || type === "warning") return <FiAlertCircle size={14} className="text-amber-500" />;
    if (type === "success") return <FiCheckCircle size={14} className="text-emerald-500" />;
    return <FiFileText size={14} className="text-blue-500" />;
  };

  const getNotifBg = (notification: NotificationItem) => {
    const type = notification.type;
    if (type === "info" || type === "indexed") return "bg-blue-50";
    if (type === "alert" || type === "warning") return "bg-amber-50";
    if (type === "success") return "bg-emerald-50";
    return "bg-slate-50";
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm dark:border-slate-700 dark:bg-[#0f172a]/95">
      <div className="flex h-full items-center justify-between px-6">
        {/* LEFT - Hamburger + Branding */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={18} />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-slate-900 leading-tight dark:text-white">
              AI Knowledge Assistant
            </h1>
            <p className="text-[11px] text-slate-500 tracking-wide dark:text-slate-400">
              Enterprise Workspace
            </p>
          </div>
        </div>

        {/* CENTER - Active page context */}
        <div className="hidden md:flex items-center gap-2 px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 border border-blue-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse dark:bg-indigo-400" />
            {pageName}
          </div>
        </div>

        {/* RIGHT - Icons + Theme + Profile */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`${theme === "light" ? "Dark" : "Light"} Mode`}
          >
            {theme === "light" ? (
              <FiMoon size={18} className="text-slate-600 dark:text-slate-300" />
            ) : (
              <FiSun size={18} className="text-amber-400" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setHelpOpen(false);
                setProfileOpen(false);
              }}
              className="relative rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="Notifications"
            >
              <FiBell size={18} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Notifications</h3>
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-medium text-blue-600 hover:text-blue-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Mark all as read
                  </button>
                </div>

                {/* Tab filters */}
                <div className="flex border-b border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => setNotifTab("all")}
                    className={`flex-1 py-2 text-xs font-medium text-center transition ${
                      notifTab === "all"
                        ? "text-blue-600 dark:text-indigo-400 border-b-2 border-blue-600 dark:border-indigo-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    All ({allNotifications.length})
                  </button>
                  <button
                    onClick={() => setNotifTab("unread")}
                    className={`flex-1 py-2 text-xs font-medium text-center transition ${
                      notifTab === "unread"
                        ? "text-blue-600 dark:text-indigo-400 border-b-2 border-blue-600 dark:border-indigo-400"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto custom-scrollbar">
                  {filteredNotifications.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <div className="flex justify-center mb-2">
                        <FiCheckCircle size={20} className="text-slate-300 dark:text-slate-500" />
                      </div>
                      <p className="text-sm text-slate-400 dark:text-slate-500">No new notifications</p>
                      <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">All caught up!</p>
                    </div>
                  ) : (
                    filteredNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => toggleRead(n.id)}
                        className={`flex items-start gap-3 px-5 py-3 border-b border-slate-50 dark:border-slate-700/50 ${getNotifBg(n)} dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer ${
                          readIds.has(n.id) || n.is_read ? "opacity-60" : ""
                        }`}
                      >
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-700 shadow-sm">
                          {getNotifIcon(n)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-tight">{n.message}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <FiClock size={10} className="text-slate-400" />
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">
                              {n.created_at ? new Date(n.created_at).toLocaleString() : ""}
                            </span>
                            {!readIds.has(n.id) && !n.is_read && (
                              <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-indigo-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Help */}
          <div className="relative" ref={helpRef}>
            <button
              onClick={() => {
                setHelpOpen(!helpOpen);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
              className="rounded-xl border border-slate-200 bg-white p-2.5 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="Help"
            >
              <FiHelpCircle size={18} className="text-slate-600 dark:text-slate-300" />
            </button>

            {helpOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Help & Guide</h3>
                  <button onClick={() => setHelpOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <FiX size={16} />
                  </button>
                </div>
                {/* Interactive query assistant */}
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="relative">
                    <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={helpQuery}
                      onChange={(e) => {
                        setHelpQuery(e.target.value);
                        if (helpSubmitted) setHelpSubmitted(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && helpQuery.trim()) {
                          e.preventDefault();
                          setHelpSubmitted(true);
                          setHelpQuery("");
                        }
                      }}
                      placeholder="Ask a question or request help..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                    />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => {
                        if (helpQuery.trim()) {
                          setHelpSubmitted(true);
                          setHelpQuery("");
                        }
                      }}
                      disabled={!helpQuery.trim()}
                      className="flex-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    >
                      Send Query
                    </button>
                    {helpSubmitted && (
                      <div className="flex-1 flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 border border-emerald-200 dark:border-emerald-900/30">
                        <FiCheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 leading-tight">Query submitted!</span>
                      </div>
                    )}
                  </div>
                  {helpSubmitted && (
                    <p className="mt-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                      Your query has been submitted to Enterprise Support! We'll get back to you shortly.
                    </p>
                  )}
                </div>
                <div className="px-5 py-4 space-y-4 max-h-60 overflow-y-auto custom-scrollbar">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      <FiSearch size={14} className="text-indigo-500" />
                      How to Query Documents
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Go to the AI Assistant page, type your question in natural language, and press Send.
                      The system retrieves relevant content from uploaded company documents.
                    </p>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      <FiMessageSquare size={14} className="text-indigo-500" />
                      Best Practices
                    </h4>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                      <li>Be specific — mention departments or document names</li>
                      <li>Upload PDFs first in the Documents page</li>
                      <li>Tag documents with relevant keywords</li>
                      <li>Review sources in the AI response for citations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      <FiBookOpen size={14} className="text-indigo-500" />
                      Quick Tips
                    </h4>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                      <li>Use &ldquo;Find documents about...&rdquo; to search</li>
                      <li>Ask &ldquo;Summarize&rdquo; for long document overviews</li>
                      <li>Check Usage Insights for analytics</li>
                    </ul>
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
                    Need more help? Contact your system administrator
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown - CLEANED: Only action items */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
                setHelpOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="Profile menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white text-sm">
                {userInitial}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-900 leading-tight dark:text-white">
                  {user?.full_name || "User"}
                </p>
                <p className="text-[10px] text-slate-500 leading-tight dark:text-slate-400">
                  {user?.role || "Employee"} • {user?.organization || "Xeven Solutions"}
                </p>
              </div>
              <FiChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 dark:text-slate-500 ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 z-50 overflow-hidden dark:border-slate-700 dark:bg-slate-800">
                {/* Simple avatar header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 font-bold text-white text-sm">
                    {userInitial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.full_name || "User"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role || "Employee"}</p>
                  </div>
                </div>

                {/* ONLY action items */}
                <div className="px-3 py-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <FiUser size={16} />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


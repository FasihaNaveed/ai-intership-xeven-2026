"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { getDashboardStats } from "@/services/analyticsService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface LoggedInUser {
  id: number;
  full_name: string;
  email: string;
  role: string;
  organization: string;
}

interface DashboardStats {
  total_documents: number;
  total_users: number;
  total_chats: number;
  total_conversations: number;
  documents_uploaded_today: number;
  questions_today: number;
  latest_document: string | null;
  latest_question: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    total_documents: 0,
    total_users: 0,
    total_chats: 0,
    total_conversations: 0,
    documents_uploaded_today: 0,
    questions_today: 0,
    latest_document: null,
    latest_question: null,
  });
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      setStats(response);
    } catch (error: any) {
      console.error("Dashboard load error:", error);
      if (error?.response) {
        alert(`Server error: ${error.response.status} - ${error.response.data?.detail || "Unknown error"}`);
      } else if (error?.request) {
        alert("Cannot connect to the API server. Please ensure the backend server is running at http://127.0.0.1:8000");
      } else {
        alert("Failed to load dashboard. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const topicData = [
    { topic: "Questions Today", questions: stats.questions_today },
    { topic: "Total Chats", questions: stats.total_chats },
  ];

  const systemData = [
    { name: "Documents", value: stats.total_documents },
    { name: "Users", value: stats.total_users },
    { name: "Chats", value: stats.total_chats },
    { name: "Conversations", value: stats.total_conversations },
  ];

  const COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f97316"];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-2xl dark:border-slate-600">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Enterprise Workspace Active
              </div>
              <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                {user ? `Welcome, ${user.full_name} 👋` : "Welcome 👋"}
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                {user?.role} • {user?.organization}
              </p>
              <p className="mt-3 max-w-xl text-slate-400">
                Enterprise AI workspace for managing company knowledge, documents, conversations and intelligent search across your organization.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                onClick={() => router.push("/documents")}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                📄 Upload Document
              </button>
              <button
                onClick={() => router.push("/chat")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/20 dark:bg-white/10 dark:text-slate-100"
              >
                🤖 Open AI Assistant
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-40 rounded-2xl border border-slate-200 bg-slate-100 animate-pulse dark:border-slate-700 dark:bg-slate-700" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatsCard title="Total Documents" value={stats.total_documents.toString()} />
              <StatsCard title="Total Users" value={stats.total_users.toString()} />
              <StatsCard title="Total Chats" value={stats.total_chats.toString()} />
              <StatsCard title="Total Conversations" value={stats.total_conversations.toString()} />
            </div>

            {/* Analytics Charts */}
            <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Questions Overview */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Questions Overview</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">AI assistant usage and conversation activity</p>
                  </div>
                  <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">Live</div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={topicData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="topic" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip />
                    <Bar dataKey="questions" fill="#2563eb" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* System Distribution */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">System Distribution</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Overall knowledge base and system statistics</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">Overview</div>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={systemData} dataKey="value" nameKey="name" outerRadius={110} innerRadius={55} paddingAngle={3} label>
                      {systemData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Today's Activity & Latest Activity */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Activity */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Today's Activity</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Daily platform usage summary</p>
                  </div>
                  <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">Today</div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">Documents Uploaded</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Added today</p>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.documents_uploaded_today}</div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">Questions Asked</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">AI assistant requests</p>
                    </div>
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.questions_today}</div>
                  </div>
                </div>
              </div>

              {/* Latest Activity */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Latest Activity</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Most recent updates</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">Live</div>
                </div>
                <div className="space-y-5">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-4">
                    <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">Latest Uploaded Document</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 break-words">
                      {stats.latest_document ? stats.latest_document : "No document uploaded yet."}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-4">
                    <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">Latest Question</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 break-words">
                      {stats.latest_question ? stats.latest_question : "No questions asked yet."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & System Status */}
            <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Quick Actions</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Frequently used actions</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => router.push("/documents")}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-left transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-md">
                    <div className="text-3xl">📄</div>
                    <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">Documents</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload & Manage</p>
                  </button>
                  <button onClick={() => router.push("/chat")}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-left transition-all duration-300 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:shadow-md">
                    <div className="text-3xl">🤖</div>
                    <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">AI Assistant</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ask Questions</p>
                  </button>
                  <button onClick={() => router.push("/conversations")}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-left transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:shadow-md">
                    <div className="text-3xl">💬</div>
                    <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">Conversations</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">View History</p>
                  </button>
                  <button onClick={() => router.push("/settings")}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-left transition-all duration-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:shadow-md">
                    <div className="text-3xl">⚙️</div>
                    <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">Settings</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Configure System</p>
                  </button>
                  <button onClick={() => setIsHelpOpen(true)}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-left transition-all duration-300 hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:shadow-md">
                    <div className="text-3xl">💡</div>
                    <h3 className="mt-3 font-semibold text-slate-900 dark:text-slate-100">Help & Guide</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Learn how to use</p>
                  </button>
                </div>
              </div>

              {/* System Status */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">System Status</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Current platform health</p>
                </div>
                <div className="space-y-5">
                  {[
                    { label: "AI Assistant", status: "Online" },
                    { label: "Knowledge Base", status: "Healthy" },
                    { label: "Database", status: "Connected" },
                    { label: "API Status", status: "Running" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                      <span className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Recent Activity</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Latest platform events and updates</p>
                </div>
                <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">Live Feed</div>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">📄</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Latest Document Uploaded</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stats.latest_document ? stats.latest_document : "No document uploaded yet."}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">🤖</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Latest AI Question</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stats.latest_question ? stats.latest_question : "No questions asked yet."}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">✅</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">AI Knowledge Assistant</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Enterprise Workspace is running normally.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Help & Guide Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                💡 Help & Guide
              </h3>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">How to Query Documents</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Go to the AI Assistant page, type your question in natural language, and press Send. The system retrieves relevant content from uploaded company documents.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Best Practices</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Be specific — mention departments or document names</li>
                  <li>Upload PDFs first in the Documents page</li>
                  <li>Tag documents with relevant keywords</li>
                  <li>Review sources in the AI response for citations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Quick Tips</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Use "Find documents about..." to search</li>
                  <li>Ask "Summarize" for long document overviews</li>
                  <li>Check Usage Insights for analytics</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex justify-end bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}


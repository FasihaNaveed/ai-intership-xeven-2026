"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
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
import { FiTrendingUp, FiUsers, FiMessageSquare, FiFileText, FiClock, FiActivity } from "react-icons/fi";

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

const COLORS = ["#2563eb", "#10b981", "#8b5cf6", "#f97316"];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const systemData = stats
    ? [
        { name: "Documents", value: stats.total_documents },
        { name: "Users", value: stats.total_users },
        { name: "Chats", value: stats.total_chats },
        { name: "Conversations", value: stats.total_conversations },
      ]
    : [];

  const topicData = stats
    ? [
        { topic: "Questions Today", count: stats.questions_today },
        { topic: "Total Chats", count: stats.total_chats },
        { topic: "Documents Today", count: stats.documents_uploaded_today },
      ]
    : [];

  const statCards = stats
    ? [
        { label: "Total Documents", value: stats.total_documents, icon: FiFileText, color: "blue" },
        { label: "Total Users", value: stats.total_users, icon: FiUsers, color: "emerald" },
        { label: "Total Chats", value: stats.total_chats, icon: FiMessageSquare, color: "violet" },
        { label: "Conversations", value: stats.total_conversations, icon: FiActivity, color: "orange" },
        { label: "Uploads Today", value: stats.documents_uploaded_today, icon: FiClock, color: "blue" },
        { label: "Questions Today", value: stats.questions_today, icon: FiTrendingUp, color: "violet" },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usage Insights</h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Dynamic analytics and platform usage statistics.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-slate-400 text-lg">Loading analytics...</p>
          </div>
        ) : !stats ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-slate-400 text-lg">Unable to load analytics data.</p>
            <button onClick={loadStats} className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition">
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {statCards.map((card) => {
                const Icon = card.icon;
                const colorMap: Record<string, string> = {
                  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
                  violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
                  orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
                };
                return (
                  <div key={card.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[card.color]}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{card.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topicData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="topic" tick={{ fontSize: 12, fill: "#64748b" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">System Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={systemData} dataKey="value" nameKey="name" outerRadius={100} innerRadius={50} paddingAngle={3} label>
                      {systemData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Latest Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Latest Document</h2>
                <p className="text-gray-700 dark:text-slate-300">
                  {stats.latest_document || "No documents uploaded yet."}
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Latest Question</h2>
                <p className="text-gray-700 dark:text-slate-300">
                  {stats.latest_question || "No questions asked yet."}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}


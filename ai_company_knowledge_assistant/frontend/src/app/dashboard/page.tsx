"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";

import { getDashboardStats } from "@/services/analyticsService";

interface DashboardStats {
  total_documents: number;
  total_users: number;
  total_chats: number;
  total_conversations: number;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    total_documents: 0,
    total_users: 0,
    total_chats: 0,
    total_conversations: 0,
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboardStats();

      setStats(response);
    } catch (error) {
      console.error(error);

      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to the AI Company Knowledge Assistant.
          </p>

        </div>

        {loading ? (

          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">

            <p className="text-lg text-gray-500">
              Loading dashboard...
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <StatsCard
              title="Total Documents"
              value={stats.total_documents.toString()}
            />

            <StatsCard
              title="Total Users"
              value={stats.total_users.toString()}
            />

            <StatsCard
              title="Total Chats"
              value={stats.total_chats.toString()}
            />

            <StatsCard
              title="Total Conversations"
              value={stats.total_conversations.toString()}
            />

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}
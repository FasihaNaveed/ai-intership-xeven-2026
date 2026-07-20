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

export default function AnalyticsPage() {
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

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getDashboardStats();

      setStats(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const topicData = [
    {
      topic: "Questions Today",
      questions: stats.questions_today,
    },
    {
      topic: "Total Chats",
      questions: stats.total_chats,
    },
  ];

  const departmentData = [
    {
      name: "Documents",
      value: stats.total_documents,
    },
    {
      name: "Users",
      value: stats.total_users,
    },
    {
      name: "Chats",
      value: stats.total_chats,
    },
    {
      name: "Conversations",
      value: stats.total_conversations,
    },
  ];

  const COLORS = [
    "#8b5cf6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-gray-900">
            Analytics
          </h1>

          <p className="text-gray-600 mt-2">
            Track usage trends and assistant performance.
          </p>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="h-36 rounded-2xl border border-gray-200 bg-gray-100 animate-pulse"
              />

            ))}

          </div>

        ) : (

          <>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <p className="text-sm text-gray-500">
                  Total Documents
                </p>

                <h2 className="text-4xl font-bold mt-2 text-blue-600">
                  {stats.total_documents}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  Uploaded company documents
                </p>

              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <p className="text-sm text-gray-500">
                  Total Users
                </p>

                <h2 className="text-4xl font-bold mt-2 text-green-600">
                  {stats.total_users}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  Registered users
                </p>

              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <p className="text-sm text-gray-500">
                  Total Chats
                </p>

                <h2 className="text-4xl font-bold mt-2 text-purple-600">
                  {stats.total_chats}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  AI conversations
                </p>

              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <p className="text-sm text-gray-500">
                  Conversations
                </p>

                <h2 className="text-4xl font-bold mt-2 text-orange-500">
                  {stats.total_conversations}
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  Conversation sessions
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  Questions Overview
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <BarChart data={topicData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="topic" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="questions"
                      fill="#2563eb"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  System Distribution
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <PieChart>

                    <Pie
                      data={departmentData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >

                      {departmentData.map((entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />

                      ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  Today's Activity
                </h2>

                <div className="space-y-4">

                  <div className="flex items-center justify-between border-b pb-3">

                    <span className="text-gray-600">
                      Documents Uploaded Today
                    </span>

                    <span className="font-bold text-blue-600">
                      {stats.documents_uploaded_today}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-gray-600">
                      Questions Asked Today
                    </span>

                    <span className="font-bold text-green-600">
                      {stats.questions_today}
                    </span>

                  </div>

                </div>

              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  Latest Activity
                </h2>

                <div className="space-y-6">

                  <div>

                    <p className="text-sm text-gray-500 mb-2">
                      Latest Uploaded Document
                    </p>

                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">

                      <p className="font-medium text-gray-800 break-words">

                        {stats.latest_document
                          ? stats.latest_document
                          : "No document uploaded yet."}

                      </p>

                    </div>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500 mb-2">
                      Latest Question
                    </p>

                    <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">

                      <p className="font-medium text-gray-800 break-words">

                        {stats.latest_question
                          ? stats.latest_question
                          : "No questions asked yet."}

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </DashboardLayout>

  );

}
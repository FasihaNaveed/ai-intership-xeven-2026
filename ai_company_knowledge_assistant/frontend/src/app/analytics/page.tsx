"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";

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


export default function AnalyticsPage() {

  const topicData = [
    {
      topic: "HR Policies",
      questions: 35,
    },
    {
      topic: "Engineering SOPs",
      questions: 27,
    },
    {
      topic: "Onboarding",
      questions: 18,
    },
    {
      topic: "Finance",
      questions: 12,
    },
    {
      topic: "IT Support",
      questions: 8,
    },
  ];

  const departmentData = [
    {
      name: "Engineering",
      value: 45,
    },
    {
      name: "HR",
      value: 30,
    },
    {
      name: "Finance",
      value: 15,
    },
    {
      name: "Operations",
      value: 10,
    },
  ];

  const COLORS = [
    "#8b5cf6", // Purple
    "#10b981", // Green
    "#f59e0b", // Orange
    "#ef4444", // Red
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics
          </h1>

          <p className="text-gray-600 mt-2">
            Track usage trends and assistant performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Questions Asked Today</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">87</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Average Confidence</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">94%</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Active Users</p>
            <h2 className="text-4xl font-bold text-purple-600 mt-2">42</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-gray-500 text-sm">Documents Indexed</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-2">128</h2>
          </div>
        </div>

        {/* Most Asked Topics */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={topicData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                type="category"
                dataKey="topic"
                width={120}
              />
              <Tooltip />
              <Bar
                dataKey="questions"
                fill="#3b82f6"
                radius={[0, 10, 10, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Usage */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Department Usage
          </h2>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
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
      </div>
    </DashboardLayout>
  );
}
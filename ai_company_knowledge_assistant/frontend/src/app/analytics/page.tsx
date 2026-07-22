"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FiClock,
  FiTrendingUp,
  FiCpu,
  FiCheckCircle,
  FiBarChart2,
  FiSearch,
  FiZap,
} from "react-icons/fi";

// RAG-specific metrics
interface RagMetrics {
  vectorIndexingLatency: string;
  topKnowledgeQueries: { query: string; count: number }[];
  embeddingTokenUsage: number;
  queryAccuracyRate: number;
  totalVectorsIndexed: number;
  avgResponseTime: string;
  documentsProcessed: number;
}

const TIME_RANGES = ["24h", "7d", "30d"] as const;
type TimeRange = (typeof TIME_RANGES)[number];

export default function UsageInsightsPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [metrics, setMetrics] = useState<RagMetrics>({
    vectorIndexingLatency: "124ms",
    topKnowledgeQueries: [
      { query: "Employee leave policy", count: 47 },
      { query: "Company code of conduct", count: 35 },
      { query: "IT security guidelines", count: 28 },
      { query: "Remote work policy", count: 22 },
      { query: "Performance review process", count: 18 },
    ],
    embeddingTokenUsage: 284_720,
    queryAccuracyRate: 94.2,
    totalVectorsIndexed: 12_845,
    avgResponseTime: "1.8s",
    documentsProcessed: 156,
  });

  const loadMetrics = async () => {
    try {
      setLoading(true);
      // In production, fetch from API
      // const response = await getRagMetrics();
      // setMetrics(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Usage Insights
          </h1>
          <p className="text-slate-600 mt-2 dark:text-slate-400">
            RAG pipeline performance, vector indexing metrics, and knowledge retrieval analytics.
          </p>
        </div>

        {/* Time Range & Refresh Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  timeRange === range
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            onClick={async () => {
              setRefreshing(true);
              await loadMetrics();
              setRefreshing(false);
            }}
            disabled={refreshing}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700 disabled:opacity-50"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-36 rounded-2xl border border-gray-200 bg-gray-100 animate-pulse dark:border-slate-700 dark:bg-slate-800" />
            ))}
          </div>
        ) : (
          <>
            {/* RAG Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Vector Indexing Latency */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500 dark:text-slate-400">Vector Indexing Latency</p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <FiClock size={18} className="text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.vectorIndexingLatency}</h2>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Average embedding & indexing time</p>
              </div>

              {/* Embedding API Token Usage */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500 dark:text-slate-400">Embedding Token Usage</p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <FiCpu size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{formatNumber(metrics.embeddingTokenUsage)}</h2>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Total tokens consumed this period</p>
              </div>

              {/* Query Accuracy Rate */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500 dark:text-slate-400">Query Accuracy Rate</p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <FiCheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.queryAccuracyRate}%</h2>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Retrieval relevance score</p>
              </div>

              {/* Avg Response Time */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500 dark:text-slate-400">Avg Response Time</p>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <FiZap size={18} className="text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{metrics.avgResponseTime}</h2>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">Average question-to-answer time</p>
              </div>
            </div>

            {/* Top Searched Knowledge Queries */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Searched Knowledge Queries</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Most frequently asked questions to the knowledge base</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <FiSearch size={20} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <div className="space-y-3">
                {metrics.topKnowledgeQueries.map((item, index) => {
                  const maxCount = metrics.topKnowledgeQueries[0].count;
                  const percentage = (item.count / maxCount) * 100;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <span className="w-6 text-sm font-semibold text-gray-400 dark:text-slate-500 text-right">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{item.query}</span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.count}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Health & Pipeline Metrics */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Vector Pipeline Health */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Vector Pipeline Health</h2>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-slate-200">Total Vectors Indexed</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Documents chunked & embedded</p>
                    </div>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatNumber(metrics.totalVectorsIndexed)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-slate-200">Documents Processed</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Successfully indexed documents</p>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.documentsProcessed}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-slate-200">Retrieval Method</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">Current search strategy</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      Hybrid Search
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Overview */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 dark:bg-slate-800 dark:border-slate-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance Overview</h2>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                      <FiBarChart2 size={22} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Indexing Throughput</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">156 docs/hr</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700">
                        <div className="h-full w-3/4 rounded-full bg-blue-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                      <FiTrendingUp size={22} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Cache Hit Rate</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">82%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700">
                        <div className="h-full w-[82%] rounded-full bg-purple-500" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                      <FiCheckCircle size={22} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Query Success Rate</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">97.5%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700">
                        <div className="h-full w-[97.5%] rounded-full bg-emerald-500" />
                      </div>
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

"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon, FiSave, FiRefreshCw, FiDatabase, FiShield, FiBell, FiGlobe } from "react-icons/fi";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [retrievalCount, setRetrievalCount] = useState(5);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.80);
  const [llmProvider, setLlmProvider] = useState("Groq");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const preferences = [
    { label: "Auto Document Indexing", key: "autoIndexing", value: true },
    { label: "Email Notifications", key: "emailNotifs", value: true },
    { label: "Session Timeout (min)", key: "timeout", value: 30 },
  ];

  const security = [
    { label: "Password Policy", value: "Strong" },
    { label: "Audit Logging", value: "Enabled" },
    { label: "Role Based Access Control", value: "Enabled" },
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate saving to backend/localStorage
    localStorage.setItem("settings", JSON.stringify({
      retrievalCount,
      confidenceThreshold,
      llmProvider,
    }));
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaveMessage("Settings saved successfully.");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Configure AI preferences, system behavior, and access policies.
          </p>
        </div>

        {/* AI Configuration */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <FiGlobe size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Configuration</h2>
          </div>

          <div className="space-y-5">
            {/* LLM Provider - custom dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Default LLM Provider</label>
              <div className="custom-select-wrapper">
                <select
                  value={llmProvider}
                  onChange={(e) => setLlmProvider(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Groq</option>
                  <option>OpenAI</option>
                  <option>Anthropic</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Retrieval Count</label>
              <input
                type="number"
                value={retrievalCount}
                onChange={(e) => setRetrievalCount(Number(e.target.value))}
                min={1}
                max={20}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Confidence Threshold</label>
              <input
                type="number"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                step={0.05}
                min={0}
                max={1}
                className="w-full rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-gray-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition disabled:bg-gray-400 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              {saving ? <FiRefreshCw size={16} className="animate-spin" /> : <FiSave size={16} />}
              {saving ? "Saving..." : "Save AI Settings"}
            </button>

            {saveMessage && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{saveMessage}</p>
            )}
          </div>
        </div>

        {/* System Preferences */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <FiBell size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Preferences</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-slate-700/50 px-4 py-3">
              <div className="flex items-center gap-3">
                {theme === "light" ? <FiSun size={18} className="text-amber-500" /> : <FiMoon size={18} className="text-indigo-400" />}
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Dark Mode</span>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            {preferences.map((pref) => (
              <div key={pref.key} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-slate-700/50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{pref.label}</span>
                <span className={`text-sm font-semibold ${pref.value ? "text-green-600 dark:text-green-400" : "text-gray-500"}`}>
                  {pref.value ? "Enabled" : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Access & Security */}
        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 p-6 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <FiShield size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Access & Security</h2>
          </div>

          <div className="space-y-4">
            {security.map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-slate-700/50 px-4 py-3">
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{item.label}</span>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">{item.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-slate-700/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <FiDatabase size={18} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Database Status</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Connected
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { getAuditLogs } from "@/services/auditLogService";
import { FiShield } from "react-icons/fi";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);

  const loadLogs = async () => {
    try {
      const data = await getAuditLogs();
      setLogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Access Audit
          </h1>
          <p className="text-slate-600 mt-2 dark:text-slate-400">
            Monitor user activity, document access, and maintain enterprise compliance.
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">User</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Action</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Resource</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                        {log.user_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {log.action}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                        {log.resource}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                          <FiShield size={24} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">No audit logs found</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Audit logs will appear here as user activity is tracked.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}


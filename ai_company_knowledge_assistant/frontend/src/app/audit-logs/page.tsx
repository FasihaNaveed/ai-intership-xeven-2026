"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { getAuditLogs } from "@/services/auditLogService";

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
          <h1 className="text-3xl font-bold text-gray-900">
            Audit Logs
          </h1>

          <p className="text-gray-600 mt-2">
            Monitor user activity and maintain enterprise compliance.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="text-left py-4 px-6">User</th>
                <th className="text-left py-4 px-6">Action</th>
                <th className="text-left py-4 px-6">Resource</th>
                <th className="text-left py-4 px-6">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      {log.user_name}
                    </td>

                    <td className="py-4 px-6">
                      {log.action}
                    </td>

                    <td className="py-4 px-6">
                      {log.resource}
                    </td>

                    <td className="py-4 px-6 text-gray-500">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-500"
                  >
                    No audit logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AuditLogsPage() {
  const logs = [
    {
      user: "Ahmed Khan",
      action: "Uploaded document",
      resource: "HR_Policy.pdf",
      time: "09 Jul 2026 - 09:15 AM",
    },
    {
      user: "Fatima Ali",
      action: "Asked AI question",
      resource: "Annual Leave Policy",
      time: "09 Jul 2026 - 10:02 AM",
    },
    {
      user: "Usman Tariq",
      action: "Deleted document",
      resource: "Old_SOP.pdf",
      time: "09 Jul 2026 - 11:30 AM",
    },
    {
      user: "Admin",
      action: "Created new user",
      resource: "Bilal Ahmed",
      time: "09 Jul 2026 - 12:10 PM",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Audit Logs
          </h1>

          <p className="text-gray-600 mt-2">
            Monitor user activity and important system events.
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
              {logs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{log.user}</td>
                  <td className="py-4 px-6">{log.action}</td>
                  <td className="py-4 px-6">{log.resource}</td>
                  <td className="py-4 px-6 text-gray-500">
                    {log.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
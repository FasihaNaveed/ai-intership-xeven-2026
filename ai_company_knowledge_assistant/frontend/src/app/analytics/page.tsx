import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Monitor platform usage, AI performance and employee engagement.
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
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Most Asked Topics
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>HR Policies</span>
              <span className="font-semibold">35%</span>
            </div>

            <div className="flex justify-between">
              <span>Engineering SOPs</span>
              <span className="font-semibold">27%</span>
            </div>

            <div className="flex justify-between">
              <span>Onboarding Process</span>
              <span className="font-semibold">18%</span>
            </div>

            <div className="flex justify-between">
              <span>Finance Policies</span>
              <span className="font-semibold">12%</span>
            </div>

            <div className="flex justify-between">
              <span>IT Support</span>
              <span className="font-semibold">8%</span>
            </div>
          </div>
        </div>

        {/* Department Usage */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Department Usage
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Department</th>
                <th className="text-left py-3">Queries</th>
                <th className="text-left py-3">Usage</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">Engineering</td>
                <td>421</td>
                <td>45%</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">HR</td>
                <td>276</td>
                <td>30%</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Finance</td>
                <td>143</td>
                <td>15%</td>
              </tr>

              <tr>
                <td className="py-4">Operations</td>
                <td>92</td>
                <td>10%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
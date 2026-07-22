import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Configure AI preferences, system behavior, and access policies.
          </p>
        </div>

        {/* AI Configuration */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            AI Configuration
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default LLM Provider
              </label>

              <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900">
                <option>Groq</option>
                <option>OpenAI</option>
                <option>Anthropic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retrieval Count
              </label>

              <input
                type="number"
                defaultValue="5"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confidence Threshold
              </label>

              <input
                type="number"
                defaultValue="0.80"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Save AI Settings
            </button>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            System Preferences
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <span>Dark Mode</span>
              <span className="text-blue-600 font-semibold">
                Disabled
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span>Auto Document Indexing</span>
              <span className="text-green-600 font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Email Notifications</span>
              <span className="text-green-600 font-semibold">
                Enabled
              </span>
            </div>
          </div>
        </div>

        {/* Access & Security Settings */}
        <div className="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-6">
            Access & Security
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <span>Session Timeout</span>
              <span className="text-blue-600 font-semibold">
                30 Minutes
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span>Password Policy</span>
              <span className="text-green-600 font-semibold">
                Strong
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span>Enable Audit Logging</span>
              <span className="text-green-600 font-semibold">
                Enabled
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Role Based Access Control</span>
              <span className="text-green-600 font-semibold">
                Enabled
              </span>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="text-gray-600 mt-2">
            Configure system preferences and application settings.
          </p>
        </div>

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
              Save Settings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Security Settings
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Enable Audit Logging</span>
              <span className="text-green-600 font-semibold">Enabled</span>
            </div>

            <div className="flex justify-between">
              <span>Role Based Access Control</span>
              <span className="text-green-600 font-semibold">Enabled</span>
            </div>

            <div className="flex justify-between">
              <span>JWT Authentication</span>
              <span className="text-green-600 font-semibold">Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
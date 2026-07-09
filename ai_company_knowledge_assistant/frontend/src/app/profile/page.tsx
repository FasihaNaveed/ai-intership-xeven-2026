import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your account information and preferences.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              F
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Fasiha Naveed
              </h2>

              <p className="text-gray-600">
                AI Engineer Intern
              </p>

              <p className="text-gray-500">
                Xeven Solutions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Fasiha Naveed"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                defaultValue="fasiha@gmail.com"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>

              <input
                type="text"
                defaultValue="Engineering"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <input
                type="text"
                defaultValue="AI Engineer Intern"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900"
              />
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
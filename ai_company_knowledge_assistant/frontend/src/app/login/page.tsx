import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            AI Knowledge Assistant
          </h1>

          <p className="text-gray-600 mt-3">
            Sign in to access company knowledge and AI assistance.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@xevensolutions.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
            Sign In
          </button>

          <div className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Xeven Solutions Internal Platform
        </div>
      </div>
    </div>
  );
}
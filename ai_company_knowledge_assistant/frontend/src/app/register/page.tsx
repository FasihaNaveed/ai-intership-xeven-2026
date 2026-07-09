import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center p-3 overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-2 h-[92vh]">
          {/* Left Side */}
          <div className="bg-slate-900 text-white flex flex-col justify-center px-10">
            <h1 className="text-3xl font-bold mb-3">
              AI Knowledge Assistant
            </h1>

            <p className="text-slate-300 text-base leading-relaxed">
              Create your account to access company knowledge,
              internal policies, AI-powered search and document intelligence.
            </p>

            <div className="mt-6 space-y-2 text-slate-300 text-sm">
              <p>✓ AI Powered Answers</p>
              <p>✓ Enterprise Security</p>
              <p>✓ Internal Knowledge Discovery</p>
              <p>✓ Document Intelligence</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center px-8 py-5">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-900 text-center">
                Create Account
              </h2>

              <p className="text-gray-600 text-center mt-1 mb-5 text-sm">
                Register to access the platform
              </p>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-600"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-600"
                />

                <select className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900">
                  <option>Engineering</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                </select>

                <input
                  type="text"
                  placeholder="Role"
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-600"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-600"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 placeholder:text-gray-600"
                />
              </div>

              <button className="w-full mt-5 bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
                Create Account
              </button>

              <div className="text-center text-gray-600 text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                Xeven Solutions Internal Platform
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
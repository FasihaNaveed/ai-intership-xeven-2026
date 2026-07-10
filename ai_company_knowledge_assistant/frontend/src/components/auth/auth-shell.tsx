import Link from "next/link";

export function AuthShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side */}
      <div className="hidden lg:flex bg-slate-900 text-white flex-col justify-between p-10">
        <div>
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold">Xeven AI</h1>
            <p className="text-slate-300 text-sm mt-1">
              Knowledge Assistant
            </p>
          </Link>
        </div>

        <div className="max-w-md">
          <h2 className="text-4xl font-bold leading-tight mb-8">
            Your company knowledge, one question away.
          </h2>

          <div className="space-y-5 text-slate-300">
            <div className="flex items-center gap-3">
              <span className="text-xl">📄</span>
              <span>Cited answers from your internal documents</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">🔒</span>
              <span>Enterprise security with role-based access</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">📊</span>
              <span>Full conversation history and analytics</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-400">
          © 2026 Xeven Solutions. Internal use only.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
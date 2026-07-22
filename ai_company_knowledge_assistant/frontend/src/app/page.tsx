export default function Home() {
  return (
    <main className="h-screen bg-white dark:bg-[#0B0F19] flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-4 py-1 text-sm font-medium text-slate-600 dark:text-slate-300 mb-5">
          Enterprise Internal Knowledge Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
          AI Company
          <span className="text-blue-600 dark:text-blue-400"> Knowledge Assistant</span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Intelligent document search and conversational AI for internal
          company knowledge, policies and technical documentation.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 dark:bg-indigo-600 text-white font-semibold hover:bg-blue-700 dark:hover:bg-indigo-700 transition">
            Employee Login
          </button>

          <button className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition">
            Explore Platform
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Document Intelligence
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Upload policies, SOPs and internal documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              AI Powered Answers
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Ask questions and receive answers with citations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 p-5">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Enterprise Security
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              RBAC, audit logs and secure access controls.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Built for enterprise knowledge discovery and internal collaboration.
        </p>
      </div>
    </main>
  );
}

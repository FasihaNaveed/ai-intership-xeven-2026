export default function Home() {
  return (
    <main className="h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1 text-sm font-medium text-gray-600 mb-5">
          Enterprise Internal Knowledge Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          AI Company
          <span className="text-blue-600"> Knowledge Assistant</span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Intelligent document search and conversational AI for internal
          company knowledge, policies and technical documentation.
        </p>

        {/* Buttons */}
        <div className="mt-7 flex justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Employee Login
          </button>

          <button className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">
            Explore Platform
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Document Intelligence
            </h3>
            <p className="text-sm text-gray-600">
              Upload policies, SOPs and internal documentation.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              AI Powered Answers
            </h3>
            <p className="text-sm text-gray-600">
              Ask questions and receive answers with citations.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Enterprise Security
            </h3>
            <p className="text-sm text-gray-600">
              RBAC, audit logs and secure access controls.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          Built for enterprise knowledge discovery and internal collaboration.
        </p>
      </div>
    </main>
  );
}
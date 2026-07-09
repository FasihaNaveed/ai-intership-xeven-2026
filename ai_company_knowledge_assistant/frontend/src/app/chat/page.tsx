import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatMessage from "@/components/chat/ChatMessage";

export default function ChatPage() {
  return (
    <DashboardLayout>
      <div className="h-[85vh] flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Assistant
          </h1>

          <p className="text-gray-600 mt-2">
            Ask questions about company policies,
            onboarding, engineering practices and
            internal documentation.
          </p>
        </div>

        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-6 overflow-y-auto space-y-4">
          <ChatMessage
            sender="user"
            message="How many annual leaves do employees receive?"
          />

          <ChatMessage
            sender="ai"
            message="Employees receive 20 annual leaves per year according to the HR Policy document."
          />

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
            <strong>Source:</strong> HR_Policy.pdf — Page 4
            <br />
            <strong>Confidence:</strong> 95%
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <input
            type="text"
            placeholder="Ask anything about company knowledge..."
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"          />

          <button className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
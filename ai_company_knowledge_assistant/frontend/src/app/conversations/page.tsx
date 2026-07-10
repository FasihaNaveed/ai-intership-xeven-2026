import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ConversationsPage() {
  const conversations = [
    {
      question: "How many annual leaves do employees receive?",
      answer: "Employees receive 20 annual leaves per year according to the HR Policy document.",
      source: "HR_Policy.pdf",
      time: "10 minutes ago",
    },
    {
      question: "What is the onboarding process for new employees?",
      answer: "New employees complete orientation, account setup and department training during their first week.",
      source: "Employee_Handbook.pdf",
      time: "1 hour ago",
    },
    {
      question: "What coding standards should engineers follow?",
      answer: "Engineering teams follow the internal coding guidelines and pull request review process.",
      source: "Engineering_SOP.pdf",
      time: "3 hours ago",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Conversations
          </h1>

          <p className="text-gray-600 mt-2">
            Browse previous conversations and revisit important answers.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <input
            type="text"
            placeholder="Search previous conversations..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conversations */}
        <div className="space-y-5">
          {conversations.map((conversation, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {conversation.time}
                </span>

                <span className="text-sm font-medium text-blue-600">
                  {conversation.source}
                </span>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-900 mb-2">
                  Employee Question
                </p>

                <p className="text-gray-700">
                  {conversation.question}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">
                  AI Response
                </p>

                <p className="text-gray-700">
                  {conversation.answer}
                </p>
              </div>

              <div className="mt-4 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Confidence Score: 95%
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
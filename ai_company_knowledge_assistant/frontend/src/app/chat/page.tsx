"use client";

import { useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatMessage from "@/components/chat/ChatMessage";

import {
  askQuestion,
} from "@/services/chatService";

export default function ChatPage() {

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [answer, setAnswer] = useState("");

  const [sources, setSources] = useState<string[]>([]);

  const handleAskQuestion = async () => {

    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    try {

      setLoading(true);

      const response = await askQuestion({
        question,
        user_id: 1,
      });

      setAnswer(response.answer);

      setSources(response.sources);

    } catch (error) {

      console.error(error);

      alert("Failed to get AI response.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <DashboardLayout>

      <div className="h-[85vh] flex flex-col">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-gray-900">
            AI Assistant
          </h1>

          <p className="text-gray-600 mt-2">
            Ask questions and receive answers from company knowledge.
          </p>

        </div>

        <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 p-6 overflow-y-auto space-y-4">

          {question && (
            <ChatMessage
              sender="user"
              message={question}
            />
          )}

          {loading && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-600">
                AI is thinking...
              </p>
            </div>
          )}

          {answer && (
            <>
              <ChatMessage
                sender="ai"
                message={answer}
              />

              {sources.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

                  <h3 className="font-semibold text-blue-700 mb-2">
                    Sources
                  </h3>

                  <ul className="list-disc list-inside text-gray-700 space-y-1">

                    {sources.map((source, index) => (
                      <li key={index}>
                        {source}
                      </li>
                    ))}

                  </ul>

                </div>
              )}
            </>
          )}

        </div>

        <div className="mt-4 flex gap-4">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about company knowledge..."
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAskQuestion();
              }
            }}
          />

          <button
            onClick={handleAskQuestion}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}
"use client";

import { useState, useRef, useEffect } from "react";

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [answer, question]);

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

      <div className="h-full max-h-full overflow-hidden flex flex-col">

        <div className="text-center mb-6 flex-shrink-0">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Assistant
          </h1>

          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Ask questions and receive answers from company knowledge.
          </p>

        </div>

        <div className="flex-1 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 overflow-y-auto custom-scrollbar space-y-4 min-h-0">

          {question && (
            <ChatMessage
              sender="user"
              message={question}
            />
          )}

          {loading && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
              <p className="text-gray-600 dark:text-slate-400">
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
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">

                  <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    Sources
                  </h3>

                  <ul className="list-disc list-inside text-gray-700 dark:text-slate-300 space-y-1">

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

          <div ref={messagesEndRef} />

        </div>

        <div className="flex-shrink-0 mt-4 flex gap-4">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about company knowledge..."
            className="flex-1 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-gray-800 dark:text-slate-200 placeholder:text-gray-500 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAskQuestion();
              }
            }}
          />

          <button
            onClick={handleAskQuestion}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-slate-600 flex-shrink-0"
          >
            {loading ? "Sending..." : "Send"}
          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}

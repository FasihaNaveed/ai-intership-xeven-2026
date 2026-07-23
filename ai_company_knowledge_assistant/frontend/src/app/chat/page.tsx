"use client";

import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ChatMessageComponent from "@/components/chat/ChatMessage";
import { askQuestion } from "@/services/chatService";
import { FiSend, FiCpu, FiMessageSquare } from "react-icons/fi";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  sources?: string[];
  loading?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Add user message immediately
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    // Add AI loading placeholder
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      text: "",
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput(""); // Clear input immediately after sending
    setLoading(true);

    try {
      const response = await askQuestion({
        question: text,
        user_id: 1,
        conversation_id: currentConversationId,
      });

      // Track the conversation_id so follow-up messages stay in the same session
      if (response.conversation_id) {
        setCurrentConversationId(response.conversation_id);
      }

      // Update the AI placeholder with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsg.id
            ? {
                ...msg,
                text: response.answer,
                sources: response.sources || [],
                loading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsg.id
            ? {
                ...msg,
                text: "Sorry, I encountered an error. Please try again.",
                loading: false,
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }

    // Focus input for next question
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-12rem)] flex-col">
        {/* Header */}
        <div className="text-center mb-4 flex-shrink-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Assistant</h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Ask questions and receive answers from company knowledge.
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 p-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-4">
                <FiMessageSquare size={36} className="text-blue-500 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ask Anything</h2>
              <p className="max-w-md text-sm text-gray-500 dark:text-slate-400">
                Type a question below to search your company knowledge base. I can help with policies, procedures, documents, and more.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.loading ? (
                    /* Compact AI thinking indicator - fit-content */
                    <div className="max-w-max px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/20">
                          <FiCpu size={12} className="text-violet-600 dark:text-violet-400" />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-slate-400">AI is thinking</span>
                        <span className="flex gap-0.5 ml-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "150ms" }} />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "300ms" }} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <ChatMessageComponent
                        sender={msg.sender}
                        message={msg.text}
                      />
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 ml-8 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 p-3 pl-4">
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">Sources</p>
                          <ul className="list-inside list-disc text-xs text-blue-600 dark:text-blue-300 space-y-0.5">
                            {msg.sources.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 mt-4 flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about company knowledge..."
            className="flex-1 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3.5 text-gray-800 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-medium text-white hover:bg-blue-700 transition disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex-shrink-0"
          >
            {loading ? (
              <FiCpu size={18} className="animate-pulse" />
            ) : (
              <FiSend size={18} />
            )}
            Send
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}


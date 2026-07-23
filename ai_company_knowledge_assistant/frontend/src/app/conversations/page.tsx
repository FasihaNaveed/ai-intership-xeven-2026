"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  getConversations,
  getChatMessagesByConversation,
  ConversationItem,
  ChatHistoryItem,
} from "@/services/chatService";
import {
  FiSearch,
  FiMessageSquare,
  FiClock,
  FiCpu,
  FiUser,
  FiTrash2,
  FiChevronLeft,
  FiX,
} from "react-icons/fi";

export default function ConversationsPage() {
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [search, setSearch] = useState("");

  // Sidebar: list of conversation sessions
  const [conversations, setConversations] = useState<ConversationItem[]>([]);

  // Active conversation & its messages
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [activeMessages, setActiveMessages] = useState<ChatHistoryItem[]>([]);

  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await getConversations(1, 50);
      setConversations(response.data || []);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (convId: number) => {
    try {
      setMessagesLoading(true);
      setActiveConvId(convId);
      const messages = await getChatMessagesByConversation(convId);
      setActiveMessages(messages);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setActiveMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  // Filter conversations by search
  const filteredConversations = useMemo(() => {
    if (!search.trim()) return conversations;
    const keyword = search.toLowerCase();
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(keyword)
    );
  }, [conversations, search]);

  const formatTime = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const formatDate = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatShortDate = (timestamp: string) => {
    const d = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const activeConversation = conversations.find((c) => c.id === activeConvId);

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] gap-0 pb-10">
        {/* ===== SIDEBAR ===== */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden mr-4`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Chat Sessions
              </h2>
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Loading sessions...
                  </p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="py-12 text-center px-4">
                  <div className="flex justify-center mb-3">
                    <FiMessageSquare
                      size={32}
                      className="text-gray-300 dark:text-slate-600"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {search
                      ? "No sessions match your search."
                      : "No chat sessions yet."}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                    Start a conversation in AI Assistant
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {filteredConversations.map((conv) => {
                    const isActive = conv.id === activeConvId;
                    return (
                      <button
                        key={conv.id}
                        onClick={() => loadMessages(conv.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition border-l-2 ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-blue-600 dark:border-l-blue-400"
                            : "border-l-transparent hover:bg-gray-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0 ${
                            isActive
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : "bg-gray-100 dark:bg-slate-800"
                          }`}
                        >
                          <FiMessageSquare
                            size={16}
                            className={
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-slate-400"
                            }
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-sm font-medium truncate ${
                              isActive
                                ? "text-blue-800 dark:text-blue-300"
                                : "text-gray-800 dark:text-slate-200"
                            }`}
                          >
                            {conv.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5">
                            {formatShortDate(conv.created_at)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ===== MAIN CHAT THREAD ===== */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          {!activeConvId ? (
            /* No session selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="flex justify-center mb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                    <FiMessageSquare
                      size={36}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Select a Chat Session
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm">
                  Choose a conversation from the sidebar to view the full thread with all questions and AI responses.
                </p>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition md:hidden"
                >
                  <FiChevronLeft size={16} />
                  Browse Sessions
                </button>
              </div>
            </div>
          ) : messagesLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 dark:text-slate-400">
                Loading messages...
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Thread Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden rounded-lg border border-gray-200 dark:border-slate-700 p-1.5 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  >
                    <FiChevronLeft size={16} className="text-gray-500" />
                  </button>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base truncate max-w-md">
                      {activeConversation?.title || "Chat Session"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      {activeMessages.length} message
                      {activeMessages.length !== 1 ? "s" : ""}
                      {activeMessages[0] &&
                        ` · ${formatDate(activeMessages[0].created_at)}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveConvId(null);
                    setActiveMessages([]);
                  }}
                  className="rounded-lg border border-gray-200 dark:border-slate-700 p-1.5 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                  title="Close"
                >
                  <FiX size={16} className="text-gray-500" />
                </button>
              </div>

              {/* Messages Thread */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-6">
                {activeMessages.map((msg, idx) => (
                  <div key={msg.id}>
                    {/* User Question */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 flex-shrink-0 mt-1">
                        <FiUser
                          size={14}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                            You
                          </p>
                          <span className="text-[10px] text-gray-400 dark:text-slate-500">
                            {formatTime(msg.created_at)}
                          </span>
                        </div>
                        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 px-4 py-3 border border-blue-100 dark:border-blue-900/30">
                          <p className="text-sm text-gray-800 dark:text-slate-200 whitespace-pre-wrap">
                            {msg.question}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/20 flex-shrink-0 mt-1">
                        <FiCpu
                          size={14}
                          className="text-violet-600 dark:text-violet-400"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-violet-700 dark:text-violet-400">
                            AI Assistant
                          </p>
                        </div>
                        <div className="rounded-2xl bg-gray-50 dark:bg-slate-700/50 px-4 py-3 border border-gray-100 dark:border-slate-600">
                          <p className="text-sm text-gray-700 dark:text-slate-300 whitespace-pre-wrap leading-7">
                            {msg.answer}
                          </p>
                        </div>

                        {/* Sources */}
                        {msg.sources && msg.sources !== "No sources found" && (
                          <div className="mt-2">
                            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/10 px-3 py-2 border border-amber-100 dark:border-amber-900/30">
                              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-0.5">
                                Sources
                              </p>
                              <p className="text-xs text-amber-600 dark:text-amber-500">
                                {msg.sources}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Separator between Q&A pairs */}
                    {idx < activeMessages.length - 1 && (
                      <div className="border-b border-dashed border-gray-100 dark:border-slate-700/50 my-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}


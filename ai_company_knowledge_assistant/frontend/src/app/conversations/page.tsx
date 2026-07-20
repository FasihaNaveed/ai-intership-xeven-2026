"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  getChatHistory,
  deleteChat,
} from "@/services/chatService";

interface ChatHistoryItem {
  id: number;
  user_id: number;
  question: string;
  answer: string;
  sources: string | null;
  created_at: string;
}

export default function ConversationsPage() {
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [conversations, setConversations] = useState<
    ChatHistoryItem[]
  >([]);

  const loadConversations = async () => {
    try {
      setLoading(true);

      const response = await getChatHistory(1);

      setConversations(response.data);
    } catch (error) {
      console.error(error);

      alert("Failed to load conversations.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (chatId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?"
    );

    if (!confirmed) return;

    try {
      await deleteChat(chatId);

      alert("Conversation deleted successfully.");

      loadConversations();
    } catch (error) {
      console.error(error);

      alert("Failed to delete conversation.");
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const filteredConversations = useMemo(() => {
    return conversations.filter((conversation) => {
      const keyword = search.toLowerCase();

      return (
        conversation.question
          .toLowerCase()
          .includes(keyword) ||
        conversation.answer
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [conversations, search]);

  return (
    <DashboardLayout>

      <div className="space-y-6 pb-10">

        <div className="text-center mb-10">

          <h1 className="text-3xl font-bold text-gray-900">
            Conversations
          </h1>

          <p className="text-gray-600 mt-2">
            Browse previous AI conversations.
          </p>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {loading ? (

          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">

            <p className="text-lg text-gray-500">
              Loading conversations...
            </p>

          </div>

        ) : filteredConversations.length === 0 ? (

          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-sm">

            <p className="text-lg text-gray-500">
              No conversations found.
            </p>

          </div>

        ) : (

          <div className="space-y-5">

            {filteredConversations.map((conversation) => (

              <div
                key={conversation.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >

                <div className="flex justify-between items-center mb-4">

                  <span className="text-sm text-gray-500">
                    {new Date(
                      conversation.created_at
                    ).toLocaleString()}
                  </span>

                  <div className="flex items-center gap-3">

                    <span className="text-sm font-medium text-blue-600">
                      {conversation.sources || "No Source"}
                    </span>

                    <button
                      onClick={() => handleDelete(conversation.id)}
                      className="rounded-lg bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                <div className="mb-4">

                  <p className="font-semibold text-gray-900 mb-2">
                    Employee Question
                  </p>

                  <p className="text-gray-700 whitespace-pre-wrap">
                    {conversation.question}
                  </p>

                </div>

                <div>

                  <p className="font-semibold text-gray-900 mb-2">
                    AI Response
                  </p>

                  <p className="text-gray-700 whitespace-pre-wrap leading-7">
                    {conversation.answer}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );

}
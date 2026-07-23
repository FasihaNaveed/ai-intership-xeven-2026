import api from "./api";

export interface ChatRequest {
  question: string;
  user_id: number;
  conversation_id?: number | null;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
  conversation_id: number;
}

export interface ChatHistoryItem {
  id: number;
  user_id: number;
  conversation_id: number | null;
  question: string;
  answer: string;
  sources: string | null;
  created_at: string;
}

export interface ChatListingResponse {
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  data: ChatHistoryItem[];
}

export interface ConversationItem {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationsListingResponse {
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  data: ConversationItem[];
}

export const askQuestion = async (
  payload: ChatRequest
): Promise<ChatResponse> => {
  const response = await api.post("/chat/ask", payload);
  return response.data;
};

export const getChatHistory = async (
  userId: number,
  pageNo: number = 1,
  pageSize: number = 10,
  conversationId?: number
) => {
  const params: Record<string, any> = {
    user_id: userId,
    page_no: pageNo,
    page_size: pageSize,
  };
  if (conversationId !== undefined) params.conversation_id = conversationId;

  const response = await api.get("/chat/history", { params });
  return response.data;
};

export const getChatMessagesByConversation = async (
  conversationId: number
): Promise<ChatHistoryItem[]> => {
  const response = await api.get(`/chat/conversation/${conversationId}`);
  return response.data;
};

export const getConversations = async (
  pageNo: number = 1,
  pageSize: number = 50
): Promise<ConversationsListingResponse> => {
  const response = await api.get("/conversations/", {
    params: { page_no: pageNo, page_size: pageSize },
  });
  return response.data;
};

export const deleteChat = async (chatId: number) => {
  const response = await api.delete(`/chat/${chatId}`);
  return response.data;
};

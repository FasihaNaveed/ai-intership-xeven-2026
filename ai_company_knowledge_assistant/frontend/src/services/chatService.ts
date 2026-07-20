import api from "./api";

export interface ChatRequest {
  question: string;
  user_id: number;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
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
  pageSize: number = 10
) => {
  const response = await api.get("/chat/history", {
    params: {
      user_id: userId,
      page_no: pageNo,
      page_size: pageSize,
    },
  });

  return response.data;
};

export const deleteChat = async (chatId: number) => {
  const response = await api.delete(`/chat/${chatId}`);
  return response.data;
};
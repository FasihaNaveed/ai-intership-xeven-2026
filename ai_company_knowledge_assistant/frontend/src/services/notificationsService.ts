import api from "./api";

export interface NotificationItem {
  id: number;
  user_id: number | null;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const getNotifications = async (
  userId?: number,
  unreadOnly: boolean = false
): Promise<NotificationItem[]> => {
  const params: Record<string, any> = {};
  if (userId !== undefined) params.user_id = userId;
  if (unreadOnly) params.unread_only = true;

  const response = await api.get("/notifications/", { params });
  return response.data;
};

export const createNotification = async (data: {
  user_id?: number;
  type?: string;
  message: string;
}): Promise<NotificationItem> => {
  const response = await api.post("/notifications/", data);
  return response.data;
};

export const markAsRead = async (
  notificationId: number
): Promise<NotificationItem> => {
  const response = await api.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllAsRead = async (userId?: number): Promise<void> => {
  const params: Record<string, any> = {};
  if (userId !== undefined) params.user_id = userId;
  await api.post("/notifications/mark-all-read", null, { params });
};

export const getUnreadCount = async (
  userId?: number
): Promise<number> => {
  const params: Record<string, any> = {};
  if (userId !== undefined) params.user_id = userId;
  const response = await api.get("/notifications/unread-count", { params });
  return response.data.unread_count;
};

export const deleteNotification = async (
  notificationId: number
): Promise<void> => {
  await api.delete(`/notifications/${notificationId}`);
};


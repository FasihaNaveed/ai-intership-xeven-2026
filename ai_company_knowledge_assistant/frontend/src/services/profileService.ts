import api from "./api";

export const getProfile = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
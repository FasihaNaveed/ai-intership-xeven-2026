import api from "./api";
import { AxiosError } from "axios";

export const getDocuments = async () => {
  const response = await api.get("/documents/");
  return response.data;
};

export const getDocumentById = async (documentId: number) => {
  try {
    const response = await api.get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.warn(`Failed to fetch document ${documentId}:`, axiosError.message);
    return null;
  }
};

export const getDocumentFileUrl = (documentId: number) => {
  return `${api.defaults.baseURL}/documents/file/${documentId}`;
};

export const uploadDocument = async (formData: FormData) => {
  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateDocument = async (documentId: number, data: any) => {
  const response = await api.put(`/documents/${documentId}`, data);
  return response.data;
};

export const deleteDocument = async (documentId: number) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
};


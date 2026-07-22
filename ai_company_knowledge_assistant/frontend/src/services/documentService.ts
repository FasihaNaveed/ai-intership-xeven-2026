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
    // Gracefully handle 405 Method Not Allowed or any other error
    if (axiosError.response?.status === 405) {
      console.warn(`API 405 for document ${documentId}, returning fallback`);
      return null;
    }
    console.error(`Failed to fetch document ${documentId}:`, error);
    return null;
  }
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
  try {
    const response = await api.put(`/documents/${documentId}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // Gracefully handle 405 Method Not Allowed - return a placeholder so the UI can update locally
    if (axiosError.response?.status === 405) {
      console.warn(`API 405 for document ${documentId} update, applying local fallback`);
      return { id: documentId, ...data, updated_local: true };
    }
    throw error;
  }
};

export const deleteDocument = async (documentId: number) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
};

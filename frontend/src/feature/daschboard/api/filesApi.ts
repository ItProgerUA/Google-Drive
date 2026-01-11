import { api } from "api/baseApi";
import { FileResponse } from "types/file";

export const filesApi = {
  uploadFile: (file: File, folderId: string | null) => {
    const formData = new FormData();
    formData.append("file", file);

    const params = folderId ? { folderId } : { folderId: "null" };

    return api.post<FileResponse>("/api/files/upload", formData, {
      params,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getFiles: (folderId: string | null) => {
    const params = folderId ? { folderId } : { folderId: "null" };
    return api.get<FileResponse[]>("/api/files", { params });
  },
  deleteFile: (id: string) => {
    return api.delete<{ message: string }>(`/api/files/${id}`);
  },
  editFile: (id: string, name: string, folderId: string | null) => {
    return api.put<FileResponse>(`/api/files/${id}`, { name, folderId });
  },
  cloneFile: (id: string) => {
    return api.post<FileResponse>(`/api/files/${id}/clone`);
  },
};

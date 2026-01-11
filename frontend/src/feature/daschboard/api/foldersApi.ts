import { api } from "api/baseApi";
import {
  CreateFolderRequest,
  FolderResponse,
  FolderWithAncestors,
} from "types/folder";

export const foldersApi = {
  createFolder: (data: CreateFolderRequest) =>
    api.post<FolderResponse>("/api/folders", data),

  getFolders: (parentId?: string | null) => {
    const params = parentId ? { parentId } : { parentId: null };
    return api.get<FolderResponse[]>("/api/folders", { params });
  },

  getFolderById: (id: string) =>
    api.get<FolderWithAncestors>(`/api/folders/${id}`),

  deleteFolder: (id: string) =>
    api.delete<{ message: string }>(`/api/folders/${id}`),

  editFolder: (id: string, name: string, parentId: string | null) =>
    api.put<FolderResponse>(`/api/folders/${id}`, { name, parentId }),
  cloneFolder: (id: string) =>
    api.post<FolderResponse>(`/api/folders/${id}/clone`),
};

export interface CreateFolderRequest {
  name: string;
  parentId?: string | null;
}

export interface FolderResponse {
  id: string;
  name: string;
  parentId: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ancestor {
  id: string | null;
  name: string;
}

export interface FolderWithAncestors extends FolderResponse {
  ancestors: Ancestor[];
}
export interface FoldersStore {
  refetchTrigger: number;
  triggerRefetch: () => void;
}

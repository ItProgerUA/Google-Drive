export interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
  parentId?: string | null;
  onSuccess?: () => void;
}
export interface UploadFileModalProps {
  open: boolean;
  onClose: () => void;
  folderId: string | null;
}

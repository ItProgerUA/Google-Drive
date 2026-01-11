export interface FileResponse {
  id: string;
  name: string;
  filename: string;
  mimetype: string;
  size: number;
  folderId: string | null;
  userId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

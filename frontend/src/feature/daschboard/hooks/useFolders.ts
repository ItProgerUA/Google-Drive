import { useState, useEffect, useCallback } from "react";
import { foldersApi } from "../api/foldersApi";
import { filesApi } from "../api/filesApi";
import { useFoldersStore } from "../store/foldersStore";
import { FolderResponse } from "types/folder";
import { FileResponse } from "types/file";
import { Ancestor } from "types/folder";
export const useFolders = (folderId: string | null) => {
  const [folders, setFolders] = useState<FolderResponse[]>([]);
  const [files, setFiles] = useState<FileResponse[]>([]);
  const [ancestors, setAncestors] = useState<Ancestor[]>([
    { id: null, name: "My Drive" },
  ]);
  const [currentFolderName, setCurrentFolderName] =
    useState<string>("My Drive");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchTrigger = useFoldersStore((state) => state.refetchTrigger);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [foldersResponse, filesResponse] = await Promise.all([
        foldersApi.getFolders(folderId),
        filesApi.getFiles(folderId),
      ]);

      setFolders(foldersResponse.data);
      setFiles(filesResponse.data);

      if (folderId) {
        const folderResponse = await foldersApi.getFolderById(folderId);
        setAncestors(folderResponse.data.ancestors);
        setCurrentFolderName(folderResponse.data.name);
      } else {
        setAncestors([{ id: null, name: "My Drive" }]);
        setCurrentFolderName("My Drive");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load");
    } finally {
      setIsLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    loadData();
  }, [loadData, refetchTrigger]);

  return {
    folders,
    files,
    ancestors,
    currentFolderName,
    isLoading,
    error,
  };
};

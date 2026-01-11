import { useState, useMemo } from "react";
import { api } from "api/baseApi";
import debounce from "lodash.debounce";
import { SearchResults } from "types/search";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    folders: [],
    files: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const isSearching = query.length >= 2;

  const handleSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        setQuery(value);
        setIsLoading(true);
        try {
          const { data } = await api.get(`/api/search?q=${value}`);
          setResults(data);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

  const clearSearch = () => {
    setQuery("");
    setResults({ folders: [], files: [] });
  };
  const removeFile = (id: string) => {
    setResults((prev) => ({
      ...prev,
      files: prev.files.filter((f) => f.id !== id),
    }));
  };
  const removeFolder = (id: string) => {
    setResults((prev) => ({
      ...prev,
      folders: prev.folders.filter((f) => f.id !== id),
    }));
  };
  return {
    query,
    results,
    isLoading,
    isSearching,
    handleSearch,
    clearSearch,
    removeFile,
    removeFolder,
  };
};

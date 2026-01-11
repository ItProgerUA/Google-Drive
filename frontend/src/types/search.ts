export interface SearchProps {
  handleSearch: (value: string) => void;
  clearSearch: () => void;
}
export interface SearchResults {
  folders: Array<{ id: string; name: string; parentId: string | null }>;
  files: Array<{ id: string; name: string; url: string }>;
}

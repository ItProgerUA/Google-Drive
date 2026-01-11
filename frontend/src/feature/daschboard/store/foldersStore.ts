import { create } from "zustand";
import { FoldersStore } from "types/folder";

export const useFoldersStore = create<FoldersStore>((set) => ({
  refetchTrigger: 0,
  triggerRefetch: () =>
    set((state) => ({ refetchTrigger: state.refetchTrigger + 1 })),
}));

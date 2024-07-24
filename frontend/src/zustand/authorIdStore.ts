import { create } from "zustand";

interface UidState {
  authorId: string | undefined;
  setAuthorId: (by: string | undefined) => void;
}

export const useAuthorIdStore = create<UidState>((set) => ({
  authorId: undefined,
  setAuthorId: (newAuthorId: string | undefined) =>
    set({ authorId: newAuthorId }),
}));

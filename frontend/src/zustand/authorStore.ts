import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface AuthorState {
  isAuthor: boolean | undefined;
  setIsAuthor: (isAuthor: boolean | undefined) => void;
}

// Create the store with persistence
export const useAuthorStore = create(
  persist<AuthorState>(
    (set) => ({
      isAuthor: false, // default state
      setIsAuthor: (isAuthor) => set({ isAuthor }),
    }),
    {
      name: "author-storage", // unique name for localStorage key
      getStorage: () => localStorage, // specify localStorage as the storage option
    }
  )
);

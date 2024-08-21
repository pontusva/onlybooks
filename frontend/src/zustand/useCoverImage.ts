import { create } from "zustand";

interface UidState {
  coverImage: string | null;
  setCoverImage: (by: string | null) => void;
}

export const useCoverImage = create<UidState>((set) => ({
  coverImage: null,
  setCoverImage: (newCoverImage: string | null) =>
    set({ coverImage: newCoverImage }),
}));

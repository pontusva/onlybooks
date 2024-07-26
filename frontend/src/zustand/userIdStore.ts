import { create } from "zustand";

interface UidState {
  userId: string | undefined;
  setUserId: (by: string | undefined) => void;
}

export const useUserIdStore = create<UidState>((set) => ({
  userId: undefined,
  setUserId: (newUserId: string | undefined) => set({ userId: newUserId }),
}));

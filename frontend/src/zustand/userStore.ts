import { create } from "zustand";

interface UidState {
  uid: string | undefined;
  setUid: (by: string | undefined) => void;
}

export const useUidStore = create<UidState>((set) => ({
  uid: undefined,
  setUid: (newUid: string | undefined) => set({ uid: newUid }),
}));

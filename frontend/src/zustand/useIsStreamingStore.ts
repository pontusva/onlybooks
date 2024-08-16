import { create } from "zustand";

interface IsStreaming {
  isStreaming: boolean;
  setIsStreaming: (by: boolean) => void;
}

export const useIsStreamingStore = create<IsStreaming>((set) => ({
  isStreaming: false,
  setIsStreaming: (isUserStreaming: boolean) =>
    set({ isStreaming: isUserStreaming }),
}));

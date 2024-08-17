import { create } from "zustand";

interface AudioState {
  folder: string;
  filename: string;
  isPlaying: boolean;
  setIsPlaying: (by: boolean) => void;
  currentBookId: string | null;
  setFolderAndFilename: (
    folder: string,
    filename: string,
    bookId: string
  ) => void;
  play: () => void;
  stop: () => void;
  togglePlayPause: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  folder: "",
  filename: "",
  isPlaying: false,
  currentBookId: null,
  setIsPlaying: (by: boolean) => set({ isPlaying: by }),
  setFolderAndFilename: (folder, filename, bookId) =>
    set({ folder, filename, isPlaying: true, currentBookId: bookId }),
  play: () => set((state) => ({ isPlaying: true })),
  stop: () => set(() => ({ isPlaying: false, currentBookId: null })),
  togglePlayPause: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),
}));

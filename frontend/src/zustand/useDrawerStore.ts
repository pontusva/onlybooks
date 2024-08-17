import { create } from "zustand";

type DrawerName = "libraryDrawer" | "profileDrawer" | "notificationsDrawer";

// DrawerState interface

interface DrawerState {
  drawers: Record<DrawerName, boolean>;
  openDrawer: (name: DrawerName) => void;
  closeDrawer: (name: DrawerName) => void;
  toggleDrawer: (name: DrawerName) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  drawers: {
    libraryDrawer: false,
    profileDrawer: false,
    notificationsDrawer: false,
  },
  openDrawer: (name) =>
    set((state) => ({
      drawers: { ...state.drawers, [name]: true },
    })),
  closeDrawer: (name) =>
    set((state) => ({
      drawers: { ...state.drawers, [name]: false },
    })),
  toggleDrawer: (name) =>
    set((state) => ({
      drawers: { ...state.drawers, [name]: !state.drawers[name] },
    })),
}));

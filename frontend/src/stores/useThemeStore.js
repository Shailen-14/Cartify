import { create } from "zustand";

export const useThemeStore = create((set) => ({
  selectedTheme: "dark",

  setTheme: (theme) => set({ selectedTheme: theme }),
}));

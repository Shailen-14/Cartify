import { create } from "zustand";

export const useThemeStore = create((set) => ({
  selectedTheme: "light",

  setTheme: (theme) => {
    set({ selectedTheme: theme });
    localStorage.setItem("theme", theme);
  },

  getTheme: () => {
    const theme = localStorage.getItem("theme") || "light";
    set({ selectedTheme: theme });
  },
}));

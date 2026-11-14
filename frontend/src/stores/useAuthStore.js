import { create } from "zustand";
import toast from "react-hot-toast";

import api from "../axios.js";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,

  signUpUser: async (data) => {
    try {
      set({ isLoading: true });
      const res = await api.post("/api/auth/sign-up", data);
      set({ user: res.data.user });
      toast.success("Signed up successfully");

      return true;
    } catch (error) {
      console.error(`Error signing up user: ${error.message}`);
      toast.error(error.response?.data?.message || "Error signing up");

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  signInUser: async (data) => {
    try {
      set({ isLoading: true });
      const res = await api.post("/api/auth/sign-in", data);
      set({ user: res.data.user });
      toast.success("Signed in successfully");

      return true;
    } catch (error) {
      console.error(`Error signing in user: ${error.message}`);
      toast.error(error.response?.data?.message || "Error signing in");

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  signOutUser: async () => {
    try {
      set({ isLoading: true });
      await api.post("/api/auth/sign-out");
      set({ user: null });
      toast.success("Signed out successfully");
    } catch (error) {
      console.error(`Error signing out user: ${error.message}`);
      toast.error(error.response?.data?.message || "Error signing out");
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await api.get("/api/auth/me");

      set({ user: res.data.user });
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(`Error checking auth: ${error.message}`);
      }

      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

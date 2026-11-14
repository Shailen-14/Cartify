import { create } from "zustand";
import toast from "react-hot-toast";

import api from "../axios";

export const useCartStore = create((set) => ({
  cart: [],
  isGettingCart: true,
  isDeletingProductFromCart: false,
  isClearingCart: false,

  resetCart: () => set({ cart: [] }),

  getCart: async () => {
    try {
      const res = await api.get("/api/cart");
      set({ cart: res.data.cart });
    } catch (error) {
      console.error(`Error fetching cart: ${error.message}`);
      toast.error(error.response?.data?.message || "Error fetching cart");
    } finally {
      set({ isGettingCart: false });
    }
  },

  addProductToCart: async (productId) => {
    try {
      const res = await api.post(`/api/cart/${productId}`);
      set({ cart: res.data.cart });
      return true;
    } catch (error) {
      console.error(`Error adding product to cart: ${error.message}`);
      toast.error(
        error.response?.data?.message || "Error adding product to cart",
      );
      return false;
    }
  },

  deleteProductFromCart: async (productId) => {
    try {
      set({ isDeletingProductFromCart: true });
      const res = await api.delete(`/api/cart/${productId}`);
      set({ cart: res.data.cart });
    } catch (error) {
      console.error(`Error deleting product from cart: ${error.message}`);
      toast.error(
        error.response?.data?.message || "Error deleting product to cart",
      );
    } finally {
      set({ isDeletingProductFromCart: false });
    }
  },

  clearCart: async () => {
    try {
      set({ isClearingCart: true });
      await api.delete("/api/cart");
      set({ cart: [] });
    } catch (error) {
      console.error(`Error clearing cart: ${error.message}`);
      toast.error(error.response?.data?.message || "Error clearing cart");
    } finally {
      set({ isClearingCart: false });
    }
  },
}));

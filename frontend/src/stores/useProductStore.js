import { create } from "zustand";
import toast from "react-hot-toast";

import api from "../axios";

export const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  isProductsLoading: true,

  getAllProducts: async () => {
    try {
      const res = await api.get("/api/products");

      set({ products: res.data.products });
    } catch (error) {
      console.error(`Error fetching products: ${error.message}`);
      toast.error(error.response?.data?.message || "Error fetching products");
    } finally {
      set({ isProductsLoading: false });
    }
  },

  updateProduct: async (id, data) => {
    try {
      set({ isLoading: true });

      const res = await api.put(`/api/products/${id}`, data);
      const updatedProduct = res.data.product;

      set((state) => ({
        products: state.products.map((prod) =>
          prod._id === id ? updatedProduct : prod,
        ),
      }));

      toast.success("Product updated successfully");
      return true;
    } catch (error) {
      console.error(`Error updating product: ${error.message}`);
      toast.error(error.response?.data?.message || "Error updating product");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (data) => {
    try {
      set({ isLoading: true });

      const res = await api.post("/api/products", data);
      set((state) => ({ products: [...state.products, res.data.product] }));

      toast.success("Product created successfully");
      return true;
    } catch (error) {
      console.error(`Error creating product: ${error.message}`);
      toast.error(error.response?.data?.message || "Error creating product");
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this product?",
      );

      if (!confirmDeletion) return;

      await api.delete(`/api/products/${id}`);

      set((state) => ({
        products: state.products.filter((prod) => prod._id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  },
}));

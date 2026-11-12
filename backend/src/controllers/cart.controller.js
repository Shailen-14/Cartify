import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const getAllItemsFromCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cart;

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(`Error in getAllItemsFromCart controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addItemToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.find((item) => item.productId.equals(productId));

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ productId });
    }

    await user.save();

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(`Error in addItemToCart controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteItemFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    user.cart = user.cart.filter((item) => !item.productId.equals(productId));

    await user.save();

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(`Error in deleteItemFromCart controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = [];

    await user.save();

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    console.error(`Error in clearCart controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

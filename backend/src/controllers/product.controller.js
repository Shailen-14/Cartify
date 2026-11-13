import { Product } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(`Error in getAllProducts controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("userId", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(`Error in getProductById controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const user = req.user;
  const { name, description, price, imgUrl } = req.body;

  try {
    if (!name || !description || price === undefined || !imgUrl) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      imgUrl,
      userId: user._id,
    });

    return res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(`Error in createProduct controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProductById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { name, description, price, imgUrl } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.userId.equals(user._id)) {
      return res
        .status(401)
        .json({ message: "User not authorised to update product" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price must be positive" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        imgUrl,
      },
      {
        runValidators: true,
        returnDocument: "after",
      },
    );

    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(`Error in updateProductById controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProductById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.userId.equals(user._id)) {
      return res
        .status(401)
        .json({ message: "User not authorised to delete product" });
    }

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error in deleteProductById controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

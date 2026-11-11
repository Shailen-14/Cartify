import bcrypt from "bcryptjs";

import { User } from "../models/user.model.js";
import { createTokenAndSetCookie } from "../lib/utils/createTokenAndSetCookie.js";

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    createTokenAndSetCookie(res, newUser._id);

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(`Error in signUpUser controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    createTokenAndSetCookie(res, user._id);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(`Error in signInUser controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signOutUser = async (req, res) => {
  try {
    res.clearCookie("auth-token");

    return res.status({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(`Error in signOutUser controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  const user = req.user;
  
  try {
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(`Error in getMe controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

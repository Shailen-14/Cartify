import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import Navbar from "./components/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import { useAuthStore } from "./stores/useAuthStore";
import { useCartStore } from "./stores/useCartStore";
import { useThemeStore } from "./stores/useThemeStore";

const App = () => {
  const { selectedTheme, getTheme } = useThemeStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
      getTheme: state.getTheme,
    })),
  );

  const { checkAuth, user, isCheckingAuth } = useAuthStore(
    useShallow((state) => ({
      checkAuth: state.checkAuth,
      user: state.user,
      isCheckingAuth: state.isCheckingAuth,
    })),
  );

  const { getCart, resetCart } = useCartStore(
    useShallow((state) => ({
      getCart: state.getCart,
      resetCart: state.resetCart,
    })),
  );

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isCheckingAuth) return;

    if (user) {
      getCart();
    } else {
      resetCart();
    }
  }, [user, isCheckingAuth, getCart, resetCart]);

  return (
    <div className="min-h-screen" data-theme={selectedTheme}>
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;

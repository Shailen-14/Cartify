import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./stores/useThemeStore";
import { useShallow } from "zustand/react/shallow";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

import Navbar from "./components/Navbar";

const App = () => {
  const { selectedTheme } = useThemeStore(
    useShallow((state) => ({
      selectedTheme: state.selectedTheme,
    })),
  );

  return (
    <div className="min-h-screen flex flex-col" data-theme={selectedTheme}>
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;

import { Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import CartItemCard from "../components/CartItemCard";

import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";

const CheckoutPage = () => {
  const { cart, clearCart, isClearingCart, isGettingCart } = useCartStore(
    useShallow((state) => ({
      cart: state.cart,
      clearCart: state.clearCart,
      isClearingCart: state.isClearingCart,
      isGettingCart: state.isGettingCart,
    })),
  );

  const { user, isCheckingAuth } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isCheckingAuth: state.isCheckingAuth,
    })),
  );

  if (!user && !isCheckingAuth) {
    return <Navigate to="/" replace />;
  }

  const isLoading = isCheckingAuth || isGettingCart;

  return (
    <div className="p-10">
      <div
        className={`mx-auto flex flex-col gap-5 ${
          cart.length === 0 ? "w-full max-w-md" : "w-fit"
        }`}
      >
        {cart.length > 0 && (
          <div className="flex justify-between px-1">
            <Link to="/" className="btn btn-ghost btn-sm flex gap-2">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
            <button
              className="btn btn-sm btn-error"
              onClick={() => clearCart()}
              disabled={isClearingCart}
            >
              Clear cart
            </button>
          </div>
        )}

        {isLoading ? (
          <p className="py-12 text-center">
            Loading cart...
          </p>
        ) : cart.length === 0 ? (
          <section className="py-12 text-center">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-base-content/70">
              Browse the homepage to find something you like.
            </p>
            <Link to="/" className="btn btn-primary mt-5">
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <CartItemCard
                key={String(item.productId?._id ?? item.productId)}
                props={item.productId}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

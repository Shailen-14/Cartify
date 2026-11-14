import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useCartStore } from "../stores/useCartStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useProductStore } from "../stores/useProductStore";

const ProductCard = ({ props }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(1);

  const user = useAuthStore((state) => state.user);

  const { deleteProduct, updateProduct, isLoading } = useProductStore(
    useShallow((state) => ({
      deleteProduct: state.deleteProduct,
      updateProduct: state.updateProduct,
      isLoading: state.isLoading,
    })),
  );

  const { addProductToCart, cart } = useCartStore(
    useShallow((state) => ({
      addProductToCart: state.addProductToCart,
      cart: state.cart,
    })),
  );

  const navigate = useNavigate();

  const modalId = `update-product-modal-${props._id}`;

  const isOwner =
    user?.email && props.userId?.email && user.email === props.userId.email;

  const quantity =
    cart.find(
      (item) =>
        String(item.productId?._id ?? item.productId) === String(props._id),
    )?.quantity ?? 0;

  const fallbackImage =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await updateProduct(props._id, {
      name,
      description,
      imgUrl,
      price: Number(price),
    });

    if (success) {
      document.getElementById(modalId)?.close();
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    await addProductToCart(props._id);
  };

  const openEditModal = () => {
    setName(props.name);
    setDescription(props.description);
    setImgUrl(props.imgUrl ?? "");
    setPrice(props.price);

    document.getElementById(modalId)?.showModal();
  };

  return (
    <div className="card bg-base-100 w-full max-w-80 border border-base-content/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
      <figure className="h-40 overflow-hidden">
        <img
          src={props.imgUrl || fallbackImage}
          alt={props.name}
          className="w-full h-full object-contain bg-white"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title line-clamp-2 break-all">{props.name}</h2>

        <p className="text-base-content/70 line-clamp-2 mb-1">
          {props.description}
        </p>

        <div className="card-actions w-full flex items-center justify-between gap-2">
          <span className="font-bold whitespace-nowrap">
            {Number(props.price).toLocaleString("en-ZA", {
              style: "currency",
              currency: "ZAR",
            })}
          </span>

          {isOwner ? (
            <div className="flex items-center gap-2">
              <button className="btn btn-xs btn-ghost" onClick={openEditModal}>
                <PenSquareIcon className="size-4" />
              </button>

              <button
                className="btn btn-xs text-error"
                onClick={() => deleteProduct(props._id)}
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={handleAddToCart}
            >
              Add to cart {quantity > 0 && `(${quantity})`}
            </button>
          )}
        </div>
      </div>

      {isOwner && (
        <dialog id={modalId} className="modal">
          <div className="modal-box px-8">
            <h3 className="font-bold text-lg">Update Product</h3>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(modalId)?.close()}
            >
              ✕
            </button>

            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-base-100 rounded-box w-full p-4">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Speakers"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="label">Description</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="This is a description"
                  maxLength={200}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label className="label">Image URL</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="https://example.com"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />

                <label className="label">Price</label>
                <input
                  type="number"
                  className="input w-full"
                  min={1}
                  max={500000}
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <button
                  className="btn btn-primary mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </fieldset>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ProductCard;

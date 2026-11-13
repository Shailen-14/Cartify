import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../stores/useAuthStore";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useState } from "react";

const ProductCard = ({ props }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(1);

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );

  const { deleteProduct, updateProduct, isLoading } = useProductStore(
    useShallow((state) => ({
      deleteProduct: state.deleteProduct,
      updateProduct: state.updateProduct,
      isLoading: state.isLoading,
    })),
  );

  const handleSubmit = async (id) => {
    await updateProduct(id, { name, description, imgUrl, price });
  };

  const fallbackImage =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  return (
    <div className="card bg-base-100 hover:bg-base-200 max-w-80 max-h-80 shadow-lg hover:shadow-xl transition-all">
      <figure>
        <img
          src={props.imgUrl}
          alt={props.name}
          className="size-full object-contain overflow-hidden bg-base-content/20"
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2 break-all">{props.name}</h2>
        <p className="text-base-content/70 line-clamp-2 break-after-auto mb-1">
          {props.description}
        </p>
        <div className="card-actions">
          {user.email === props.userId.email ? (
            <div className="w-full flex justify-between gap-2">
              <p className="font-md font-bold">
                {Number(props.price).toLocaleString("en-ZA", {
                  style: "currency",
                  currency: "ZAR",
                })}
              </p>
              <button
                className="btn btn-xs btn-ghost"
                onClick={async () => {
                  setName(props.name);
                  setDescription(props.description);
                  setImgUrl(props.imgUrl);
                  setPrice(props.price);

                  document.getElementById("update-product-modal").showModal();
                }}
              >
                <PenSquareIcon className="size-4" />
              </button>
              <dialog id="update-product-modal" className="modal">
                <div className="modal-box px-8">
                  <h3 className="font-bold text-lg">Update Product</h3>
                  <form method="dialog" onSubmit={() => handleSubmit(props._id)}>
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      type="button"
                      onClick={() =>
                        document.getElementById("update-product-modal").close()
                      }
                    >
                      ✕
                    </button>

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
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />

                      <button
                        className="btn btn-primary mt-4"
                        type="submit"
                        disabled={isLoading}
                      >
                        Update
                      </button>
                    </fieldset>
                  </form>
                </div>
              </dialog>
              <button
                className="btn btn-xs text-error"
                onClick={() => deleteProduct(props._id)}
              >
                <TrashIcon className="size-4" />
              </button>
            </div>
          ) : (
            <div className="px-2 w-full flex justify-end">
              <button className="btn btn-sm btn-primary">Add to cart</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

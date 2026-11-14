import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import ProductCard from "../components/ProductCard";

import { useAuthStore } from "../stores/useAuthStore";
import { useProductStore } from "../stores/useProductStore";

const HomePage = () => {
  const user = useAuthStore((state) => state.user);

  const {
    getAllProducts,
    createProduct,
    products,
    isLoading,
    isProductsLoading,
  } = useProductStore(
    useShallow((state) => ({
      createProduct: state.createProduct,
      getAllProducts: state.getAllProducts,
      products: state.products,
      isLoading: state.isLoading,
      isProductsLoading: state.isProductsLoading,
    })),
  );

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const navigate = useNavigate();

  const handleCreateClick = () => {
    if (user) {
      document.getElementById("create-product-modal").showModal();
    } else {
      navigate("/sign-in");
    }
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const success = await createProduct({
      name,
      description,
      price: Number(price),
      imgUrl,
    });

    if (success) {
      setName("");
      setDescription("");
      setImgUrl("");
      setPrice(1);
      document.getElementById("create-product-modal")?.close();
    }
  };

  return (
    <div className="py-20 px-10">
      <div className="max-w-6xl mx-auto px-8">
        <button
          className="btn btn-primary btn-sm font-bold"
          onClick={handleCreateClick}
        >
          Create product
        </button>

        <dialog id="create-product-modal" className="modal">
          <div className="modal-box px-8">
            <h3 className="font-bold text-lg">Create Product</h3>

            <form onSubmit={handleSubmit}>
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() =>
                  document.getElementById("create-product-modal")?.close()
                }
                type="button"
              >
                ✕
              </button>

              <fieldset className="fieldset w-full p-4">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  id="name"
                  placeholder="Speakers"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="label" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  className="input w-full"
                  id="description"
                  placeholder="This is a description..."
                  maxLength={200}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label className="label" htmlFor="imgUrl">
                  Image URL
                </label>
                <input
                  type="text"
                  className="input w-full"
                  id="imgUrl"
                  placeholder="https://example.com"
                  required
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                />

                <label className="label" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  className="input w-full"
                  id="price"
                  min={1}
                  max={500000}
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <button
                  className="btn btn-primary mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
              </fieldset>
            </form>
          </div>
        </dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mt-10">
          {isProductsLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex w-70 flex-col gap-4">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}

          {!isProductsLoading && products.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <h2 className="text-xl font-semibold">No products yet</h2>
              <p className="mt-2 text-base-content/70">
                Be the first to add a product.
              </p>
              <button
                className="mt-4 cursor-pointer text-primary font-bold"
                onClick={handleCreateClick}
              >
                Create product
              </button>
            </div>
          )}

          {products.map((product) => (
            <ProductCard key={product._id} props={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

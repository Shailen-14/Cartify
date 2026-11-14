const CartItemCard = ({ props, quantity }) => {
  const fallbackImage =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  return (
    <div className="card bg-base-100 max-w-96 md:max-w-120 border border-base-content/20 shadow-lg hover:shadow-xl grid grid-cols-2 mx-auto">
      <div className="card-body">
        <h2 className="card-title line-clamp-2 break-all">{props.name}</h2>
        <p className="text-base-content/70 line-clamp-3 break-all">
          {props.description}
        </p>
        <p className="font-bold">
          {Number(props.price).toLocaleString("en-ZA", {
            style: "currency",
            currency: "ZAR",
          })}
        </p>
        <p className="font-bold mt-12">Quantity: {quantity}</p>
      </div>
      <figure>
        <img
          className="size-full object-contain overflow-hidden bg-white"
          src={props.imgUrl}
          alt={props.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </figure>
    </div>
  );
};

export default CartItemCard;

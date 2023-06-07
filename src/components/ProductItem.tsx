import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { notify } from "./PopUp/Notification";
import { addToCart } from "../api/cartApi";
import { getErrorMessage } from "../utils/getErrorMessage";
import useCartContext from "../context/CartContext";
import { useMutation } from "@tanstack/react-query";

type ProductItemProps = {
  product: Product;
  main?: boolean;
  handleDeleteProduct?: (id: string) => void;
  isOwner?: boolean;
};

function ProductItem({
  product,
  main,
  handleDeleteProduct,
  isOwner,
}: ProductItemProps) {
  const createdAt = new Date(product.createdAt).toLocaleDateString();
  let shortenedDescription = "";

  if (product.description) {
    shortenedDescription = `${product.description.slice(0, 35)}...`;
  }

  const { refetchCart } = useCartContext();

  const addMutation = useMutation(addToCart, {
    onSuccess: () => {
      refetchCart()
        .then(() => {
          notify({ type: "success", message: "Product added to cart!" });
        })
        .catch((err) => {
          notify({ type: "error", message: getErrorMessage(err) });
        });
    },
  });

  const handleAddToCart = (cartItemId: string) => {
    addMutation.mutate(cartItemId);
  };

  return (
    <div
      className="flex flex-col items-start justify-center border border-gray-300 p-6 shadow-md transition-all duration-300 hover:border-gray-400 hover:shadow-2xl"
      key={product.id}
    >
      <div className="mb-8 flex h-80 w-64 cursor-pointer items-center self-center border-b border-b-gray-300">
        <Link to={`/products/${product.id}`}>
          <img
            className="h-full w-full object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-center">
        <span>Added by: {isOwner ? "You" : product.createdBy}</span>
        <span>Category: {product.category}</span>
        <span>Created at: {createdAt}</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
        <p>{shortenedDescription}</p>
        <p className="text-xl italic">${product.price}</p>
        {main ? (
          <button
            className="main-button my-2 w-full"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to cart
          </button>
        ) : null}
        {!main && (
          <div className="flex w-full">
            <Link
              className="main-button-reverse my-2 w-full"
              to={`/edit-product/${product.id}`}
            >
              Edit
            </Link>
            {handleDeleteProduct && (
              <button
                className="main-button my-2 w-full"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;

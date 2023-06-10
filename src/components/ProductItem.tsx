import { Link, useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { notify } from "./PopUp/Notification";
import { addToCart } from "../api/cartApi";
import { getErrorMessage } from "../utils/getErrorMessage";
import useCartContext from "../context/CartContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import YouSureModal from "./YouSureModal";
import { useUserContext } from "../context/UserContext";

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
  const [showModal, setShowModal] = useState(false);

  const { userData } = useUserContext();
  const navigate = useNavigate();

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
    notify({ type: "info", message: "Adding product to cart..." });
    addMutation.mutate(cartItemId);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="flex flex-col items-start justify-center border border-gray-300 p-6 shadow-md transition-all duration-300 hover:border-gray-400 hover:shadow-2xl"
      key={product.id}
    >
      <div className="mb-8 flex h-80 w-64 cursor-pointer items-center self-center border-b border-b-gray-300">
        <Link to={`/products/${product.id}`} className="h-full w-full object-cover">
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
        {!isOwner ? (
          <button
            className="main-button my-2 w-full"
            onClick={
              userData?.isLoggedIn
                ? () => handleAddToCart(product.id)
                : () => navigate("/login")
            }
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
              <button className="main-button my-2 w-full" onClick={toggleModal}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      <YouSureModal
        showModal={showModal}
        toggleModal={toggleModal}
        closeModal={closeModal}
        handleChange={() =>
          handleDeleteProduct && handleDeleteProduct(product.id)
        }
      />
    </div>
  );
}

export default ProductItem;

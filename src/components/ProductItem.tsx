import { Link } from "react-router-dom";
import { Product } from "../types/product";

type ProductItemProps = {
  product: Product;
  main?: boolean;
  handleDeleteProduct: (id: string) => void;
};

function ProductItem({ product, main, handleDeleteProduct }: ProductItemProps) {
  const createdAt = new Date(product.createdAt).toLocaleDateString();
  let shortenedDescription = "";

  if (product.description) {
    shortenedDescription = `${product.description.slice(0, 35)}...`;
  }

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
        <span>Added by: {product.createdBy}</span>
        <span>Category: {product.category}</span>
        <span>Created at: {createdAt}</span>
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <h2 className="mt-4 text-2xl font-bold">{product.name}</h2>
        <p>{shortenedDescription}</p>
        <p className="text-xl italic">${product.price}</p>
        {main && (
          <button className="main-button my-2 w-full">Add to cart</button>
        )}
        {!main && (
          <div className="flex w-full">
            <Link
              className="main-button-reverse my-2 w-full"
              to={`/edit-product/${product.id}`}
            >
              Edit
            </Link>
            <button
              className="main-button my-2 w-full"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductItem;

import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Home() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <Spinner />;

  const allProductsEl = data?.products.map((product) => {
    const createdAt = new Date(product.createdAt).toLocaleDateString();
    let shortenedDescription = "";
    if (product.description) {
      shortenedDescription = `${product.description.slice(0, 35)}...`;
    }

    return (
      <Link
        to={`/products/${product.id}`}
        className="flex cursor-pointer flex-col items-start justify-center border border-gray-300 p-6 shadow-md transition-all duration-300 hover:border-gray-400 hover:shadow-2xl"
        key={product.id}
      >
        <div className="mb-8 flex h-80 w-64 items-center self-center border-b border-b-gray-300">
          <img
            className="h-full w-full object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
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
        </div>
        <button className="main-button mt-4 w-full">Add to cart</button>
      </Link>
    );
  });

  return (
    <div className="text-center">
      <SearchBar placeholder="Search..." />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProductsEl}
      </div>
    </div>
  );
}

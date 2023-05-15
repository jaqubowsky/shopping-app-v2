import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;

  const allProductsEl = data?.products.map((product) => {
    const createdAt = new Date(product.createdAt).toLocaleDateString();

    return (
      <Link
        to={`/products/${product.id}`}
        className="flex cursor-pointer flex-col items-start justify-center border border-gray-300 p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-gray-300 hover:shadow-xl"
        key={product.id}
      >
        <div className="mb-8 flex h-80 w-64 items-center self-center border-b border-b-gray-300">
          <img
            className="h-full w-full object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <span>Added by: {product.createdBy}</span>
        <span>Category: {product.category}</span>
        <span>Created at: {createdAt}</span>
        <div className="flex flex-col items-start justify-center gap-2">
          <h2 className="mt-6 text-2xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
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

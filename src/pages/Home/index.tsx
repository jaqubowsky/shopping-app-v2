import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";

export default function Home() {
  const { data }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const allProductsEl = data?.products.map((product) => {
    return (
      <div
        className="flex cursor-pointer flex-col items-start justify-center border border-gray-300 p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-gray-300 hover:shadow-xl"
        key={product.id}
      >
        <div className="mb-8 self-center flex h-80 w-64 items-center border-b border-b-gray-300">
          <img
            className="h-full w-full object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
          <span>Added by: {product.createdBy}</span>
          <h2 className="mt-6 text-2xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button className="mt-5 w-full rounded-md bg-yellow-800 p-2 font-bold text-white transition-all hover:scale-105 hover:bg-yellow-700">
            Add to cart
          </button>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allProductsEl}
    </div>
  );
}

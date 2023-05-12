import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  const allProductsEl = data?.products.map((product) => {
    return (
      <div
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
        <h2 className="mt-6 text-2xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button className="main-button mt-4 w-full">Add to cart</button>
      </div>
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

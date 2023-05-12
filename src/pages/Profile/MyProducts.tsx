import { getUserProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";

export default function MyProducts() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getUserProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  if (isLoading) return <div>Loading...</div>;

  const userProductsEl = data?.products.map((product) => {
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
        <button className="mt-5 w-full rounded-md bg-yellow-800 p-2 font-bold text-white transition-all hover:scale-105 hover:bg-yellow-700">
          Add to cart
        </button>
      </div>
    );
  });

  return (
    <div>
      <SearchBar placeholder="Search your products..." />
      {userProductsEl ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userProductsEl}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-8 text-4xl font-bold">You have no products yet!</h2>
          <button className="main-button w-8/12">Click here to add one!</button>
        </div>
      )}
    </div>
  );
}

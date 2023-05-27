import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../components/Spinner";
import ProductItem from "../../components/ProductItem";

export default function Home() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <Spinner />;

  const allProductsEl = data?.products.map((product) => {
    return <ProductItem main product={product} key={product.id} />;
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

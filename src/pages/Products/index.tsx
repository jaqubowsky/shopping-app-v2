import { getProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../components/Spinner";
import ProductItem from "../../components/ProductItem";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

const clearSearchParams = () => {
  setSearchParams((prevParams) => {
    const newParams = new URLSearchParams(prevParams.toString());
    newParams.set("search", "");
    return Object.fromEntries(newParams);
  });
};

  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  let filteredProducts = data?.products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(searchParams.get("search")?.toLowerCase() || "")
  );

  if (searchParams.get("category")) {
    filteredProducts = filteredProducts?.filter((product) =>
      product.category
        .toLowerCase()
        .includes(searchParams.get("category")?.toLowerCase() || "")
    );
  }

  if (isLoading) return <Spinner />;

  const allProductsEl = filteredProducts?.map((product) => {
    return <ProductItem main product={product} key={product.id} />;
  });

  return (
    <div className="flex flex-col items-center">
      <SearchBar
        clearSearchParams={clearSearchParams}
        searchParams={searchParams}
        placeholder="Search..."
      />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allProductsEl}
      </div>
    </div>
  );
}

import { getUserProducts } from "../../api/productsApi";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProductItem from "../../components/ProductItem";

export default function MyProducts() {
  const { data, isLoading }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["userProducts"],
    queryFn: getUserProducts,
  });

  if (isLoading) return <Spinner />;

  const userProductsEl = data?.products.map((product) => {
    return <ProductItem product={product} key={product.id} />;
  });

  if (!userProductsEl || userProductsEl.length === 0)
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-8 text-4xl font-bold">You have no products yet!</h2>
        <Link to="/add-product" className="main-button w-8/12">
          Click here to add one!
        </Link>
      </div>
    );

  return (
    <div>
      <SearchBar placeholder="Search your products..." />

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userProductsEl}
      </div>
    </div>
  );
}

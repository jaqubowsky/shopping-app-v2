import {
  deleteProduct,
  getUserProducts,
} from "../../api/productsApi";
import { useQuery, UseQueryResult, useMutation } from "@tanstack/react-query";
import { ProductsData } from "../../types/product";
import SearchBar from "../../components/SearchBar";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ProductItem from "../../components/ProductItem";
import { notify } from "../../components/PopUp/Notification";

export default function MyProducts() {
  const { data, isLoading, refetch }: UseQueryResult<ProductsData> = useQuery({
    queryKey: ["userProducts"],
    queryFn: getUserProducts,
  });

  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      refetch()
        .then(() =>
          notify({ message: "Product deleted successfully!", type: "success" })
        )
        .catch(() =>
          notify({
            message: "Something went wrong while deleting!",
            type: "error",
          })
        );
    },
  });

  if (isLoading || deleteProductMutation.isLoading) return <Spinner />;

  const handleDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };


  const userProductsEl = data?.products.map((product) => {
    return (
      <ProductItem
        handleDeleteProduct={handleDeleteProduct}
        product={product}
        key={product.id}
      />
    );
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

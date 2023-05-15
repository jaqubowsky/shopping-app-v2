import { useParams } from "react-router-dom";
import { getUserProduct } from "../../api/productsApi";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ProductData } from "../../types/product";

function ProductPage() {
  const params = useParams();
  const productId = params.id || "";

  const { data, isLoading }: UseQueryResult<ProductData> = useQuery(
    ["product", productId],
    () => getUserProduct(productId)
  );
  const product = data?.product;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>This is your product with id: {productId}</h1>
    </div>
  );
}

export default ProductPage;

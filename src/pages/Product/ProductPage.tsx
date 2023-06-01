import { useParams } from "react-router-dom";
import { getUserProduct } from "../../api/productsApi";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ProductData } from "../../types/product";
import { GoLocation } from "react-icons/go";
import imgUrl from "../../assets/location.jpg";
import { getUserById } from "../../api/userApi";
import { OtherUserResponse } from "../../types/user";
import Spinner from "../../components/Spinner";

function ProductPage() {
  const params = useParams();
  const productId = params.id || "";


  const {
    data: productData,
    isLoading: isProductLoading,
  }: UseQueryResult<ProductData> = useQuery(["product", productId], () =>
    getUserProduct(productId)
  );

  const product = productData?.product;

  const {
    data: userData,
    isLoading: isUserDataLoading,
  }: UseQueryResult<OtherUserResponse> = useQuery(
    ["userData", product?.belongsToId],
    () => getUserById(product?.belongsToId)
  );

  if (isProductLoading || isUserDataLoading) return <Spinner />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex w-full max-w-screen-xl flex-col items-center justify-center gap-6">
      {/* image */}
      <div className="flex flex-col gap-4 md:flex-row">
        <section className="product-section w-96">
          <img
            className="object-fit h-full w-full"
            alt={product.name}
            src={product.imageUrl}
          />
        </section>

        {/* name */}
        <div className="flex flex-col gap-4">
          <section className="product-section h-1/4 max-w-sm">
            <h2 className="mb-2 break-all text-xl">{product.name}</h2>
            <p className="mb-2 text-2xl font-bold italic">${product.price}</p>
          </section>

          {/* contact */}
          <section className="product-section h-3/4">
            <span>Private person</span>
            <div className="my-4 flex items-center justify-start gap-2">
              <img
                className="h-12 w-12"
                src={userData?.user.imageUrl}
                alt={userData?.user.username}
              />
              <h2 className="text-2xl font-bold">{userData?.user.username}</h2>
            </div>
            <div className="flex flex-col gap-4 text-center">
              <div className="flex gap-1">
                <button className="main-button w-1/2">Call</button>
                <button className="main-button-reverse w-1/2">
                  Send Message
                </button>
              </div>
              <span className="cursor-pointer text-sm text-gray-700 transition-colors hover:text-gray-900 hover:drop-shadow-md">
                Get more offers from this seller
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* description */}
      <section className="product-section md:w-3/4">
        <h2 className="mb-2 text-xl">Description</h2>
        <p className="mb-2 break-words p-2">{product.description}</p>
      </section>

      {/* location */}
      <section className="product-section">
        <div className="flex flex-col items-center justify-center gap-2">
          <a
            className="mb-2 cursor-pointer hover:drop-shadow-md"
            href={`https://www.google.pl/maps/place/${product.location}`}
            target="_blank"
            rel="noreferrer"
          >
            <img className="object-cover" src={imgUrl} alt={product.location} />
          </a>
          <div className="flex justify-center gap-2">
            <GoLocation className="text-2xl" />
            <p className="text-center">{product.location}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;

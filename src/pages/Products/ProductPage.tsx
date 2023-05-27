import { useParams } from "react-router-dom";
import { getUserProduct } from "../../api/productsApi";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ProductData } from "../../types/product";
import { GoLocation } from "react-icons/go";
import { AiOutlinePhone } from "react-icons/ai";
import imgUrl from "../../assets/location.jpg";
import { getUserById } from "../../api/userApi";
import { OtherUserResponse } from "../../types/user";
import { notify } from "../../components/PopUp/Notification";
import Spinner from "../../components/Spinner";

function ProductPage() {
  const params = useParams();
  const productId = params.id || "";

  const copyToClipboard = (textToCopy: string | number) => {
    //eslint-disable-next-line
    navigator.clipboard.writeText(String(textToCopy));
    notify({ message: "Copied to clipboard", type: "success" });
  };

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
    <div className="flex flex-col items-start justify-center gap-6">
      {/* image */}
      <section className="max-w-sm">
        <img
          className="h-full w-full object-cover"
          alt={product.name}
          src={product.imageUrl}
        />
      </section>

      {/* name */}
      <section className="border border-b-gray-400 bg-gray-200 px-2 py-4">
        <h2 className="mb-2 text-xl">{product.name}</h2>
        <p className="mb-2 text-2xl font-bold italic">${product.price}</p>
      </section>

      {/* description */}
      <section className="border border-b-gray-400 bg-gray-200 px-2 py-4">
        <h2 className="mb-2 text-xl">Description</h2>
        <p className="mb-2">{product.description}</p>
      </section>

      {/* contact */}
      <section className="border border-b-gray-400 bg-gray-200 px-2 py-4">
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
            <button className="main-button-reverse w-1/2">Send Message</button>
          </div>
          <span className="cursor-pointer text-sm text-gray-700 transition-colors hover:text-gray-900 hover:drop-shadow-md">
            Get more offers from this seller
          </span>
        </div>
      </section>

      {/* location */}
      <section className="border border-b-gray-400 bg-gray-200 p-2">
        <div className="flex flex-col justify-center gap-2">
          <a
            className="cursor-pointer mb-2"
            href={`https://www.google.pl/maps/place/${product.location}`}
            target="_blank"
            rel="noreferrer"
          >
            <img className="object-cover" src={imgUrl} alt={product.location} />
          </a>
          <div className="flex gap-2 justify-center">
            <GoLocation className="text-2xl" />
            <p className="text-center">{product.location}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;

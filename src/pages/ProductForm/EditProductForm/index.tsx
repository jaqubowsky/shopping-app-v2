import { FormEvent, useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { notify } from "../../../components/PopUp/Notification";
import Spinner from "../../../components/Spinner";
import EditProductForm from "../EditProductForm";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { editProduct, getUserProduct } from "../../../api/productsApi";
import { ProductData } from "../../../types/product";
import { FormInputs } from "../../../types/form";

export function EditProduct() {
  const { id } = useParams();
  const productId = id || "";

  const {
    data: productData,
    isLoading: isProductLoading,
    isFetching,
  }: UseQueryResult<ProductData> = useQuery(
    ["product", productId],
    () => getUserProduct(productId),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (productData?.product) {
      const {
        name,
        category,
        description,
        price,
        email,
        phoneNumber,
        location,
        imageUrl,
      } = productData.product;

      reset({
        name: name || "",
        category: category || "",
        description: description || "",
        price: price || 0,
        email: email || "",
        phoneNumber: phoneNumber || 0,
        location: location || "",
      });

      setPreviewImage(imageUrl || "");
    }
  }, [productData, reset]);

  const handleImageChange = (event: FormEvent<HTMLInputElement>) => {
    try {
      const inputElement = event.target as HTMLInputElement;

      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];

        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File is too big!");
        }

        if (!file.type.startsWith("image/")) {
          throw new Error("File is not an image!");
        }

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      setPreviewImage("");
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  const editProductMutation = useMutation(editProduct);

  const handleEditProduct = async (formData: FormData, productId: string) => {
    try {
      await editProductMutation.mutateAsync({ formData, productId });
      notify({ message: "Product edited successfully!", type: "success" });
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  const compileFormData = ({
    name,
    description,
    category,
    price,
    image,
    location,
    phoneNumber,
  }: FormInputs) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    if (category) {
      formData.append("category", category);
    }
    formData.append("price", price.toString());

    if (image) {
      formData.append("image", image[0]);
    }

    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber.toString());

    return formData;
  };

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    try {
      const compiledFormData = compileFormData(formData);
      await handleEditProduct(compiledFormData, productId);
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  if (isProductLoading || editProductMutation.isLoading || isFetching)
    return <Spinner />;

  return (
    <div className="flex w-8/12 flex-col items-start gap-4">
      <h1 className="text-center text-4xl">
        Edit <span className="text-yellow-800 drop-shadow-sm">product</span>
      </h1>
      <EditProductForm
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        handleImageChange={handleImageChange}
        previewImage={previewImage}
      />
    </div>
  );
}

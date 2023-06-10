import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addProduct } from "../../../api/productsApi";
import AddProductForm from "../AddProductForm";
import { notify } from "../../../components/PopUp/Notification";
import Spinner from "../../../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { FormInputs } from "../../../types/form";
import { useUserContext } from "../../../context/UserContext";

export function AddProduct() {
  const [previewImage, setPreviewImage] = useState("");
  const { userData } = useUserContext();

  const defaultValues = {
    name: "",
    username: userData?.user?.username,
    description: "",
    price: 0,
    image: undefined,
    category: undefined,
    email: userData?.user?.email || "",
    phoneNumber: userData?.user?.phoneNumber || 0,
    location: userData?.user?.location || "",
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: defaultValues,
  });

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

      return setPreviewImage("");
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      notify({ message: "Product added successfully!", type: "success" });
    },
    onError: (err) => {
      notify({ message: getErrorMessage(err), type: "error" });
    },
  });

  const handleAddProduct = (formData: FormData) => {
    addProductMutation.mutate(formData);
    setPreviewImage("");
    reset();
  };

  const compileFormData = ({
    name,
    description,
    category,
    price,
    image,
    email,
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

    if (email) {
      formData.append("email", email);
    }
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber.toString());

    return formData;
  };

  const onSubmit: SubmitHandler<FormInputs> = ({
    name,
    description,
    category,
    price,
    image,
    email,
    location,
    phoneNumber,
  }) => {
    try {
      const formData = compileFormData({
        name,
        description,
        category,
        price,
        image,
        email,
        location,
        phoneNumber,
      });
      handleAddProduct(formData);
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  if (addProductMutation.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex w-8/12 flex-col items-start gap-4">
      <h1 className="text-center text-4xl">
        Add new <span className="text-yellow-800 drop-shadow-sm">product</span>
      </h1>
      <AddProductForm
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

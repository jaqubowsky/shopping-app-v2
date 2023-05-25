import { FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addProduct } from "../../api/productsApi";
import AddProductForm from "./AddProductForm";
import { checkLoginStatus } from "../../api/userApi";
import { notify } from "../../components/PopUp/Notification";
import Spinner from "../../components/Spinner";

export type FormInputs = {
  name: string;
  description: string;
  price: number | null;
  category: string;
  image?: FileList;
  email: string;
  phoneNumber: number;
  location: string;
};

export default function AddProduct() {
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: async () => {
      const data = await checkLoginStatus();
      return {
        name: "",
        description: "",
        price: null,
        category: "",
        email: data?.user.email || "",
        phoneNumber: data?.user.phoneNumber || 0,
        location: data?.user.location || "",
      };
    },
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
      notify({ message: err.message, type: "error" });
    }
  };

  const handleAddProduct = async (formData: FormData) => {
    await addProduct(formData).then((resp) => {
      if (resp.status === 201) {
        setIsLoading(false);
        setPreviewImage("");
        reset();
      }
    });
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
    formData.append("category", category);
    if (price) {
      formData.append("price", price.toString());
    }
    if (image) {
      formData.append("image", image[0]);
    }
    formData.append("email", email);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber.toString());

    return formData;
  };

  const onSubmit: SubmitHandler<FormInputs> = async ({
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
      setIsLoading(true);
      await handleAddProduct(formData);
      notify({ message: "Product added successfully!", type: "success" });
    } catch (err) {
      notify({ message: err.message, type: "error" });
    }
  };

  if (isLoading) {
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

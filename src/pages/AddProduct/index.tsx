import { Input, Select, Option, Textarea } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { addProduct } from "../../api/productsApi";
import { onPromise } from "../../utils/onPromise";
import { useErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../components/ErrorMessage";

type Inputs = {
  e?: Event;
  name: string;
  description: string;
  price: number;
  category: string;
  image: FileList;
};

export default function AddProduct() {
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

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
      showBoundary(err);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    description,
    category,
    price,
    image,
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("image", image[0]);

      setIsLoading(true);

      await addProduct(formData).then((resp) => {
        if (resp.status === 201) {
          setIsLoading(false);
          setPreviewImage("");
          reset();
        }
      });
    } catch (err) {
      showBoundary(err);
    }
  };

  return isLoading ? (
    <h2>Adding product...</h2>
  ) : (
    <div className="flex w-8/12 flex-col items-start gap-4">
      <h1 className="text-4xl">
        Add new <span className="text-yellow-800 drop-shadow-sm">product</span>
      </h1>

      <form
        className="mb-2 mt-8 flex w-full flex-col gap-2"
        onSubmit={onPromise(handleSubmit(onSubmit))}
      >
        <div className="mb-4 rounded-sm bg-gray-100 p-4">
          <h2 className="mb-5 text-xl">The more details, the better!</h2>
          <div className="flex w-3/4 flex-col gap-4">
            <Input
              size="lg"
              label="Name"
              color="amber"
              {...register("name", {
                required: "Product name is required.",
              })}
            />
            {errors.name && (
              <ErrorMessage
                message={
                  errors.name.message ? errors.name.message : "Unknown error"
                }
              />
            )}
            <Controller
              control={control}
              name="category"
              rules={{ required: "Category is required." }}
              render={({ field: { onChange, name } }) => (
                <Select
                  label="Select category"
                  color="amber"
                  onChange={onChange}
                  name={name}
                >
                  <Option value={undefined}>---</Option>
                  <Option value="Clothes">Clothes</Option>
                  <Option value="Electronics">Electronics</Option>
                  <Option value="Motorization">Motorization</Option>
                  <Option value="Home and garden">Home and garden</Option>
                  <Option value="Real estate">Real estate</Option>
                  <Option value="Education">Education</Option>
                  <Option value="For kids">For kids</Option>
                  <Option value="Animals">Animals</Option>
                  <Option value="Sport and hobby">Sport and hobby</Option>
                  <Option value="Heath and beauty">Health and beauty</Option>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4">
          <div className="mb-5">
            <h2 className="text-xl">Photo</h2>
            <h3 className="text-gray-600">Maximum file load is 5 MB!</h3>
          </div>
          <div className="relative flex flex-row justify-between">
            <label
              htmlFor="fileInput"
              className="h-72 cursor-pointer rounded bg-yellow-700 p-4 text-center text-white hover:bg-yellow-600"
            >
              Choose File
            </label>
            {previewImage && (
              <div className="h-72 w-72">
                <img
                  id="preview"
                  className="h-full w-full object-cover"
                  src={previewImage}
                  alt="preview"
                />
              </div>
            )}
            <div className="gap-4">
              <input
                id="fileInput"
                onInput={(event) => handleImageChange(event)}
                type="file"
                className="absolute inset-0 z-[-1] opacity-0"
                {...register("image", {
                  required: "Image is required.",
                })}
              />
              {errors.image && (
                <ErrorMessage
                  message={
                    errors.image.message
                      ? errors.image.message
                      : "Unknown error."
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4">
          <div className="w-3/4">
            <h2 className="mb-5 text-xl">Description</h2>
            <Textarea
              color="amber"
              variant="static"
              placeholder="Enter the information that would be important to you when viewing such product."
              {...register("description")}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4">
          <div className="w-1/4">
            <h2 className="mb-5 text-xl">Enter the price</h2>
            <Input
              color="amber"
              label="Price"
              icon="$"
              {...register("price", {
                required: "Price is required.",
              })}
            />
            {errors.price && (
              <ErrorMessage
                message={
                  errors.price.message ? errors.price.message : "Unknown error"
                }
              />
            )}
          </div>
        </div>
        <div className="text-center">
          <button className="main-button w-9/12">Add product!</button>
        </div>
      </form>
    </div>
  );
}

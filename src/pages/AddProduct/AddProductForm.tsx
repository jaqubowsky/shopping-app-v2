import { onPromise } from "../../utils/onPromise";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Input, Textarea } from "@material-tailwind/react";
import SelectCategory from "./SelectCategory";
import { FormInputs } from ".";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FormEvent } from "react";

type AddProductFormProps = {
  control: Control<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  handleImageChange: (event: FormEvent<HTMLInputElement>) => void;
  previewImage: string;
  onSubmit: (data: FormInputs) => void;
};

export default function AddProductForm({
  control,
  handleSubmit,
  register,
  errors,
  handleImageChange,
  previewImage,
  onSubmit,
}: AddProductFormProps) {
  return (
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
          <SelectCategory control={control} />
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
              onInput={(e) => handleImageChange(e)}
              type="file"
              className="absolute inset-0 z-[-1] opacity-0"
              {...register("image", {
                required: "Image is required.",
              })}
            />
            {errors.image && (
              <ErrorMessage
                message={
                  errors.image.message ? errors.image.message : "Unknown error."
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
  );
}

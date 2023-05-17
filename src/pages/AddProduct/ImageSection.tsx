import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from ".";
import { FormEvent } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";

type ImageSectionProps = {
  previewImage: string;
  handleImageChange: (event: FormEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}

function ImageSection({previewImage, handleImageChange, register, errors}: ImageSectionProps) {
  return (
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
              required: validationInfo.required.image,
            })}
          />
          {errors.image && (
            <ErrorMessage
              message={
                errors.image.message ? errors.image.message : validationInfo.undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
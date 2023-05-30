import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormEvent } from "react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";
import { FormInputs } from "../../types/form";

type ImageSectionProps = {
  previewImage: string;
  handleImageChange: (event: FormEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function ImageSection({
  previewImage,
  handleImageChange,
  register,
  errors,
}: ImageSectionProps) {
  return (
    <>
      <section className="form-section">
        <div className="mb-5">
          <h2 className="text-xl">Photo</h2>
          <h3 className="text-gray-600">Maximum file load is 5 MB!</h3>
        </div>
        <div className="relative flex flex-col items-center gap-4">
          <label
            htmlFor="fileInput"
            className="w-full cursor-pointer rounded bg-yellow-700 p-4 text-center text-white hover:bg-yellow-600"
          >
            Choose File
          </label>
          <div className="input-box">
            <input
              id="fileInput"
              onInput={(e) => handleImageChange(e)}
              type="file"
              className="absolute inset-0 z-[-1] opacity-0"
              {...register("image", {
                required: !previewImage && validationInfo.required.image,
              })}
            />
            {errors.image && (
              <ErrorMessage
                message={
                  errors.image.message
                    ? errors.image.message
                    : validationInfo.undefined
                }
              />
            )}
          </div>
        </div>
      </section>

      <section className="form-section items-center">
        {previewImage && (
          <div className="flex max-w-xl">
            <img
              className="h-full w-full object-cover"
              src={previewImage}
              alt="product preview"
            />
          </div>
        )}
      </section>
    </>
  );
}

export default ImageSection;

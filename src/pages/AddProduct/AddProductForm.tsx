import { onPromise } from "../../utils/onPromise";
import { FormInputs } from ".";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FormEvent } from "react";
import ContactSection from "./ContactSection";
import PriceSection from "./PriceSection";
import DescriptionSection from "./DescriptionSection";
import ImageSection from "./ImageSection";
import NameSection from "./NameSection";

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
      <NameSection register={register} errors={errors} control={control} />
      <ImageSection
        previewImage={previewImage}
        handleImageChange={handleImageChange}
        register={register}
        errors={errors}
      />
      <DescriptionSection register={register} errors={errors} />
      <PriceSection register={register} errors={errors} />
      <ContactSection register={register} errors={errors} />
      <div className="text-center">
        <button className="main-button w-9/12">Add product!</button>
      </div>
    </form>
  );
}

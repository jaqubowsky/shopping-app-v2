import { Input } from "@material-tailwind/react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FormInputs } from ".";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { validationInfo } from "./validationInfo";

type PriceSectionProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function PriceSection({ errors, register }: PriceSectionProps) {
  return (
    <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4 items-center">
        <h2 className="text-xl">Enter the price</h2>
        <Input
          color="amber"
          label="Price"
          icon="$"
          {...register("price", {
            required: validationInfo.required.price,
          })}
        />
        {errors.price && (
          <ErrorMessage
            message={
              errors.price.message ? errors.price.message : validationInfo.undefined
            }
          />
        )}
      </div>
  );
}

export default PriceSection
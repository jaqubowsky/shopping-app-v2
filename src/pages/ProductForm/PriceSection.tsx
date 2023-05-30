import { Input } from "@material-tailwind/react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FormInputs } from "../../types/form";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { validationInfo } from "./validationInfo";

type PriceSectionProps = {
  register: UseFormRegister<FormInputs >;
  errors: FieldErrors<FormInputs >;
};

function PriceSection({ errors, register }: PriceSectionProps) {
  return (
    <section className="form-section">
      <h2 className="text-xl">Enter the price</h2>
      <div className="input-box">
        <Input
          color="amber"
          label="Price"
          icon="$"
          type="number"
          {...register("price", {
            required: validationInfo.required.price,
          })}
        />
        {errors.price && (
          <ErrorMessage
            message={
              errors.price.message
                ? errors.price.message
                : validationInfo.undefined
            }
          />
        )}
      </div>
    </section>
  );
}

export default PriceSection;

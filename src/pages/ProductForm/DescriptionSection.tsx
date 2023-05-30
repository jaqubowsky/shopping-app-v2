import { Textarea } from "@material-tailwind/react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FormInputs } from "../../types/form";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { validationInfo } from "./validationInfo";

type DescriptionSectionProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function DescriptionSection({ register, errors }: DescriptionSectionProps) {
  return (
    <section className="form-section">
      <h2 className="text-xl">Description</h2>
      <div className="input-box">
        <Textarea
          color="amber"
          variant="static"
          placeholder="Enter the information that would be important to you when viewing such product."
          {...register("description", {
            minLength: 80,
            maxLength: 500,
            required: "Description is required.",
          })}
        />
        {errors.description && (
          <ErrorMessage
            message={
              errors.description.message
                ? errors.description.message
                : errors.description.type === "minLength"
                ? validationInfo.length.notLongEnough.description
                : errors.description.type === "maxLength"
                ? validationInfo.length.tooLong.description
                : validationInfo.undefined
            }
          />
        )}
      </div>
    </section>
  );
}

export default DescriptionSection;

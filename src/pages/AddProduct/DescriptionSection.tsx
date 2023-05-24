import { Textarea } from "@material-tailwind/react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { FormInputs } from ".";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { validationInfo } from "./validationInfo";

type DescriptionSectionProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function DescriptionSection({ register, errors }: DescriptionSectionProps) {
  return (
    <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4">
      <div className="flex items-center flex-col">
        <h2 className="mb-5 text-xl">Description</h2>
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
    </div>
  );
}

export default DescriptionSection;
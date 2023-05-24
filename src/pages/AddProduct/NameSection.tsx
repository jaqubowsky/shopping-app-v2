import { Input } from "@material-tailwind/react";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from ".";
import SelectCategorySection from "./SelectCategorySection";
import { validationInfo } from "./validationInfo";

type NameSectionProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  control: Control<FormInputs>;
};

function NameSection({ register, errors, control }: NameSectionProps) {
  return (
    <div className="mb-4 rounded-sm bg-gray-100 p-4 text-start">
      <h2 className="mb-5 text-xl">The more details, the better!</h2>
      <div className="flex flex-col gap-4 items-center">
        <Input
          size="lg"
          label="Name"
          color="amber"
          {...register("name", {
            required: validationInfo.required.name,
          })}
        />
        {errors.name && (
          <ErrorMessage
            message={
              errors.name.message ? errors.name.message : validationInfo.undefined
            }
          />
        )}
        <SelectCategorySection control={control} />
      </div>
    </div>
  );
}

export default NameSection;

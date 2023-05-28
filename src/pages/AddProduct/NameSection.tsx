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
    <section className="form-section">
      <h2 className="text-xl">
        The more details, the{" "}
        <span className="text-yellow-800 drop-shadow-lg">better!</span>
      </h2>
      <div className="inputs-box md:flex-row">
        <div className="input-box">
          <Input
            size="lg"
            label="Name"
            color="amber"
            {...register("name", {
              required: validationInfo.required.name,
              maxLength: 100,
            })}
          />
          {errors.name && (
            <ErrorMessage
              message={
                errors.name.message
                  ? errors.name.message
                  : errors.name.type === "maxLength"
                  ? validationInfo.length.tooLong.name
                  : validationInfo.undefined
              }
            />
          )}
        </div>
        <SelectCategorySection control={control} />
      </div>
    </section>
  );
}

export default NameSection;

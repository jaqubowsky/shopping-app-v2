import { Input } from "@material-tailwind/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from ".";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";

type AddProductFormProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function ContactSection({ register, errors }: AddProductFormProps) {

  return (
    <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4 ">
      <h2 className="text-xl">Enter the contact details</h2>
      <div className="flex w-1/4 flex-col gap-6">
        <Input
          color="amber"
          label="Email"
          className="disabled:cursor-not-allowed"
          disabled
          {...register("email", {
            required: validationInfo.required.email,
            pattern: /\S+@\S+\.\S+/,
          })}
        />
        {errors.email && (
          <ErrorMessage
            message={
              errors.email.message
                ? errors.email.message
                : validationInfo.undefined
            }
          />
        )}
        <Input
          color="amber"
          label="Number"
          type="number"
          {...register("phoneNumber", {
            required: validationInfo.required.phoneNumber,
          })}
        />
        {errors.phoneNumber && (
          <ErrorMessage
            message={
              errors.phoneNumber.message
                ? errors.phoneNumber.message
                : validationInfo.undefined
            }
          />
        )}
        <Input
          color="amber"
          label="Location"
          {...register("location", {
            required: validationInfo.required.location,
          })}
        />
        {errors.location && (
          <ErrorMessage
            message={
              errors.location.message
                ? errors.location.message
                : validationInfo.undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default ContactSection
import { Input } from "@material-tailwind/react";
import { UserResponse } from "../../types/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from ".";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";

type AddProductFormProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  userData: UserResponse | null;
};

function ContactSection({ register, errors, userData }: AddProductFormProps) {
  return (
    <div className="mb-4 flex flex-col gap-8 rounded-sm bg-gray-100 p-4 ">
      <h2 className="text-xl">Enter the contact details</h2>
      <div className="flex w-1/4 flex-col gap-6">
        <Input
          color="amber"
          label="Email"
          className="disabled:cursor-not-allowed"
          disabled
          value={userData?.user.email ? userData?.user.email : ""}
          {...register("email", {
            required: userData?.user.email
              ? false
              : validationInfo.required.email,
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
          value={userData?.user.phoneNumber ? userData?.user.phoneNumber : ""}
          {...register("phoneNumber", {
            required: userData?.user.phoneNumber
              ? false
              : validationInfo.required.phoneNumber,
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
          value={userData?.user.location ? userData?.user.location : ""}
          {...register("location", {
            required: userData?.user.location
              ? false 
              : validationInfo.required.location,
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
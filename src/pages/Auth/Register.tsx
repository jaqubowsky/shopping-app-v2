import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { registerWithEmailAndPassword } from "../../api/userApi";
import { Link } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";
import { notify } from "../../components/PopUp/Notification";

type Inputs = {
  e?: Event;
  name: string;
  surname: string;
  location: string;
  phoneNumber: string;

  username: string;
  email: string;
  password: string;
  cpassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (
    { email, password, username, name, surname, location, phoneNumber },
    e
  ) => {
    e?.preventDefault();
    try {
      const registerValues = {
        email,
        password,
        username,
        name,
        surname,
        location,
        phoneNumber,
      };
      await registerWithEmailAndPassword(registerValues);
      notify({ message: "Registered successfully!", type: "success" });
    } catch (err) {
      notify({ message: err.message, type: "error" });
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        className="mb-2 mt-8"
      >
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              size="lg"
              label="Name"
              {...register("name", {
                required: validationInfo.required.username,
              })}
            />
            {errors.name && (
              <ErrorMessage
                message={
                  errors.name.message
                    ? errors.name.message
                    : validationInfo.undefined
                }
              />
            )}
            <Input
              type="text"
              size="lg"
              label="Surname"
              {...register("surname", {
                required: validationInfo.required.surname,
              })}
            />
            {errors.surname && (
              <ErrorMessage
                message={
                  errors.surname.message
                    ? errors.surname.message
                    : validationInfo.undefined
                }
              />
            )}
            <Input
              type="number"
              size="lg"
              label="Number"
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
              type="text"
              size="lg"
              label="Location"
              {...register("location", {
                required: validationInfo.required.surname,
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
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              size="lg"
              label="Username"
              {...register("username", {
                required: validationInfo.required.username,
              })}
            />
            {errors.username && (
              <ErrorMessage
                message={
                  errors.username.message
                    ? errors.username.message
                    : validationInfo.undefined
                }
              />
            )}
            <Input
              type="email"
              size="lg"
              label="Email"
              {...register("email", {
                required: validationInfo.required.email,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: validationInfo.notMatch.email,
                },
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
              type="password"
              size="lg"
              label="Password"
              {...register("password", {
                required: validationInfo.required.password,
                minLength: {
                  value: 8,
                  message: validationInfo.notLongEnough.password,
                },
              })}
            />
            {errors.password && (
              <ErrorMessage
                message={
                  errors.password.message
                    ? errors.password.message
                    : validationInfo.undefined
                }
              />
            )}
            <Input
              type="password"
              size="lg"
              label="Verify password"
              {...register("cpassword", {
                required: validationInfo.required.cpassword,
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return validationInfo.notMatch.password;
                  }
                },
              })}
            />
            {errors.cpassword && (
              <ErrorMessage
                message={
                  errors.cpassword.message
                    ? errors.cpassword.message
                    : validationInfo.undefined
                }
              />
            )}
          </div>
        </div>
        <Button className="mt-6" type="submit" color="amber" fullWidth>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link
            to="/login"
            replace
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
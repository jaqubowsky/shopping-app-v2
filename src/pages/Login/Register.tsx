import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase";
import { Link } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";
import { useErrorBoundary } from "react-error-boundary";

type Inputs = {
  e?: Event;
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

  const { showBoundary } = useErrorBoundary();

  const onSubmit: SubmitHandler<Inputs> = async (
    { email, password, username },
    e
  ) => {
    e?.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password, username);
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <Card color="transparent" shadow={false} onSubmit={() => register}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-2">
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
              required: true,
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
        <Button className="mt-6" type="submit" color="amber" fullWidth>
          Register
        </Button>
        <Button
          className="mt-6"
          color="amber"
          onClick={onPromise(signInWithGoogle)}
          fullWidth
        >
          Register with Google
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

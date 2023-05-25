import { Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";
import { loginWithEmailAndPassword } from "../../api/userApi";
import { notify } from "../../components/PopUp/Notification";

type Inputs = {
  e?: Event;
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }, e) => {
    e?.preventDefault();
    try {
      const formValues = { email, password };

      await loginWithEmailAndPassword(formValues);
      navigate(0);
      notify({ message: "Logged in successfully!", type: "success" });
    } catch (err) {
      notify({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="mx-auto my-0 w-72">
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
      </Typography>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        className="mb-2 mt-8 w-80"
      >
        <div className="flex w-11/12 flex-col gap-2">
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
          <Button className="mt-6" type="submit" color="amber" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Do not have an account?{" "}
            <Link
              to="/register"
              replace
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
}

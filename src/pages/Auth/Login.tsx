import { Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { validationInfo } from "./validationInfo";
import { notify } from "../../components/PopUp/Notification";
import { loginWithEmailAndPassword } from "../../api/userApi";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "../../utils/getErrorMessage";
import Spinner from "../../components/Spinner";
import { useUserContext } from "../../context/UserContext";

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

  const { refetch } = useUserContext();

  const loginMutation = useMutation(loginWithEmailAndPassword, {
    onSuccess: () => {
      refetch()
        .then(() => {
          notify({ message: "Logged in successfully!", type: "success" });
        })
        .catch(() =>
          notify({
            message: "Something went wrong while logging in!",
            type: "error",
          })
        );
    },
  });

  const handleLogin = async (formValues: {
    email: string;
    password: string;
  }) => {
    await loginMutation.mutateAsync(formValues);
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }, e) => {
    e?.preventDefault();
    try {
      const formValues = { email, password };
      await handleLogin(formValues);
    } catch (err) {
      notify({ message: getErrorMessage(err), type: "error" });
    }
  };

  if (loginMutation.isLoading) return <Spinner />;

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
            color="amber"
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
            color="amber"
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
          <div
            color="gray"
            className="mt-4 flex items-center justify-center gap-2 font-normal"
          >
            <Typography color="gray">Do not have an account?</Typography>
            <Link
              to="/register"
              replace
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              <Typography color="amber">Sign Up </Typography>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

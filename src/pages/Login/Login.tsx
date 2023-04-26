import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../../../firebase";
import { Link } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Error } from "../../components/Error";
import { CustomAlert } from "../../components/PopUp/CustomAlert";
import { validationInfo } from "./validationInfo";

type Inputs = {
  e?: Event;
  email: string;
  password: string;
};

type RegisterProps = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({ error, setClose, setError }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }, e) => {
    e?.preventDefault();
    try {
      await logInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(getErrorMessage(err));
      setClose(false);
    }
  };

  return (
    <Card color="transparent" shadow={false} onSubmit={() => register}>
      <Typography variant="h4" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
      </Typography>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-2">
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
            <Error
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
            <Error
              message={
                errors.password.message
                  ? errors.password.message
                  : validationInfo.undefined
              }
            />
          )}
        </div>
        <Button className="mt-6" type="submit" color="amber" fullWidth>
          Login
        </Button>
        <Button
          className="mt-6"
          color="amber"
          onClick={onPromise(signInWithGoogle)}
          fullWidth
        >
          Login with Google
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
        <Typography color="gray" className="mt-4 text-center font-normal">
          Forgot your password?{" "}
          <Link
            to="/login/reset-password"
            replace
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Reset
          </Link>
        </Typography>
      </form>
      {error && (
        <CustomAlert
          message={error}
          setMessage={setError}
          setClose={setClose}
          error
        />
      )}
    </Card>
  );
}

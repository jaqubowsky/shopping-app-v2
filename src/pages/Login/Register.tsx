import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase";
import { Link } from "react-router-dom";
import { onPromise } from "../../utils/onPromise";
import { useForm, SubmitHandler } from "react-hook-form";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { Error } from "../../components/Error";
import { CustomAlert } from "../../components/PopUp/CustomAlert";

type Inputs = {
  e?: Event;
  username: string;
  email: string;
  password: string;
};

type RegisterProps = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Register({ error, setClose, setError }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (
    { email, password, username },
    e
  ) => {
    e?.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password, username);
    } catch (err) {
      setError(getErrorMessage(err));
      setClose(false);
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
            {...register("username", { required: true })}
          />
          {errors.username && <Error message="Username is required" />}
          <Input
            type="email"
            size="lg"
            label="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <Error message="Email is required" />}
          <Input
            type="password"
            size="lg"
            label="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <Error message="Password is required" />}
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

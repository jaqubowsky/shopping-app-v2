import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendPasswordReset } from "../../../firebase";
import { onPromise } from "../../utils/onPromise";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useErrorBoundary } from "react-error-boundary";
import { validationInfo } from "./validationInfo";

type Inputs = {
  e?: Event;
  email: string;
};

function Reset() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const { showBoundary } = useErrorBoundary();

  const onSubmit: SubmitHandler<Inputs> = async ({ email }, e) => {
    e?.preventDefault();
    try {
      await sendPasswordReset(email);
    } catch (err) {
      showBoundary(err);
    } finally {
      reset();
    }
  };

  return (
    <Card className="" color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Reset your password
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to reset password.
      </Typography>
      <form
        onSubmit={onPromise(handleSubmit(onSubmit))}
        className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="flex flex-col gap-2">
          <Input
            size="lg"
            label="Email"
            {...register("email", { required: validationInfo.required.email })}
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
        </div>
        <Button
          type="submit"
          disabled={watch("email") === "" ? true : false}
          className="mt-6 disabled:cursor-not-allowed"
          color="amber"
          fullWidth
        >
          Reset
        </Button>
      </form>
    </Card>
  );
}

export default Reset;

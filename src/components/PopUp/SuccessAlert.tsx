import { Alert } from "@material-tailwind/react";

type SuccessAlertProps = {
  message: string;
};

function SuccessAlert({ message }: SuccessAlertProps) {

  return (
      <Alert
        className="fixed left-1/2 top-6 z-50 mx-auto w-auto -translate-x-1/2 transform"
        color="green"
      >
        {message}
      </Alert>
    )
}

export default SuccessAlert;

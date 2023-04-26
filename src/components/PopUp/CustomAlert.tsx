import { Alert } from "@material-tailwind/react";

type ErrorAlertProps = {
  message: string;
  error?: boolean;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CustomAlert({
  setMessage,
  setClose,
  message,
  error,
}: ErrorAlertProps) {
  return (
    <Alert
      className="fixed left-1/2 top-6 mx-auto w-auto -translate-x-1/2 transform"
      color={error ? "red" : "green"}
      dismissible={{
        onClose: () => {
          setClose(true);
          setMessage("");
        },
      }}
    >
      {message}
    </Alert>
  );
}

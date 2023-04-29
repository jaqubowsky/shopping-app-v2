import { Alert } from "@material-tailwind/react";
import { useState } from "react";

type ErrorBoundaryPopupProps = {
  error: Error;
  onReset: () => void;
};

function ErrorBoundaryPopup({ onReset, error }: ErrorBoundaryPopupProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setShow] = useState(true);

  return (
    <Alert
      className="fixed left-1/2 top-6 mx-auto w-auto -translate-x-1/2 transform"
      color="red"
      dismissible={{
        onClose: () => {
          setShow(false);
          onReset();
        },
      }}
    >
      {error.message}
    </Alert>
  );
}

export default ErrorBoundaryPopup;

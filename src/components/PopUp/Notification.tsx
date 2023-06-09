import { toast, ToastContainer } from "react-toastify";

type NotifyProps = {
  message: string;
  type?: "success" | "error" | "warning" | "info";
};

export const notify = ({ message, type }: NotifyProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast(message);
  }
};

const Notification = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Notification;

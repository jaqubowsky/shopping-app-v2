import { motion } from "framer-motion";

type ErrorProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorProps) {
  return (
    <motion.span
      animate={{ x: [-10, 10, -10, 10, 0], transition: { duration: 0.25 } }}
      className="mb-3 pl-2 text-red-900"
    >
      {message}
    </motion.span>
  );
}

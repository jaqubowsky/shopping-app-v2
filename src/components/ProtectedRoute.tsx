import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

type ProtectedRouteProps = {
  condition: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({
  condition,
  redirectPath,
  children,
}: PropsWithChildren<ProtectedRouteProps>): JSX.Element => {
  if (condition === false) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

type ProtectedRouteProps = {
  isUserLoggedIn: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({
  isUserLoggedIn,
  redirectPath,
  children,
}: PropsWithChildren<ProtectedRouteProps>): JSX.Element => {

  if (!isUserLoggedIn === false) {
    return <Navigate to={redirectPath} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

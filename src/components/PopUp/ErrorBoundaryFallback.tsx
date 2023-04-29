import ErrorBoundaryPopup from "./ErrorBoundaryPopup";
import { ReactNode } from "react";

type ErrorBoundaryFallbackProps = {
  childComponent: ReactNode;
  error: Error;
  resetErrorBoundary: () => void;
};

function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
  childComponent: ChildComponent,
}: ErrorBoundaryFallbackProps) {
  return (
    <>
      {ChildComponent}
      <ErrorBoundaryPopup error={error} onReset={resetErrorBoundary} />
    </>
  );
}

export default ErrorBoundaryFallback;

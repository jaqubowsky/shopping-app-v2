import { useState, useEffect } from "react";

const useAlert = (initialState = false, timeout = 2000) => {
  const [showAlert, setShowAlert] = useState(initialState);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, timeout);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert, timeout]);

  const showAlertMessage = () => {
    setShowAlert(true);
  };

  return { showAlert, showAlertMessage };
};

export default useAlert;

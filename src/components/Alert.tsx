import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const Alert = () => {
  const { message } = useContext(NotificationContext);

  if (message != "") {
    return <div>{message}</div>;
  } else {
    return null;
  }
};

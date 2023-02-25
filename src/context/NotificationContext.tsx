import { createContext, ReactNode, useState } from "react";
type Props = {
  children?: ReactNode;
};

type INotificationContext = {
  message: string;
  setMessage: (newState: string) => void;
};

const initialValue = {
  message: "",
  setMessage: () => {},
};

const NotificationContext = createContext<INotificationContext>(initialValue);

const NotificationProvider = ({ children }: Props) => {
  const [message, setMessage] = useState(initialValue.message);

  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };

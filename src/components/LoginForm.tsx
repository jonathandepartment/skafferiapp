import React, { useContext, useState } from "react";
import { NotificationContext } from "../context/NotificationContext";

type Props = {
  handleLogin: (email: string, password: string) => void;
};
type LoginFormType = {
  email: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const [loginForm, setLoginForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const { setMessage } = useContext(NotificationContext);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginForm.email.length < 1) {
      setMessage("Email can't be empty");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else if (loginForm.password.length < 1) {
      setMessage("Password can't be empty");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      props.handleLogin(loginForm.email, loginForm.password);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={loginForm.email}
          onChange={onChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={onChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

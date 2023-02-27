import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

import "../assets/css/Login.css";

type Props = {};

const Login = (props: Props) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const { setMessage } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const mockUserInDb = {
      email: "test@test.com",
      password: "test",
    };

    if (email == mockUserInDb.email && password == mockUserInDb.password) {
      setAuthenticated(true);
      navigate("/");
    } else {
      setMessage("Wrong credentials");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;

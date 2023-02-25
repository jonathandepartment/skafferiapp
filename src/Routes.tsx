import { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

type Props = {};

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Router>
  );
};

export default Routes;

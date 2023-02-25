import { useContext } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  return (
    <nav>
      <ul className="navbar-ul">
        <li className="navbar-li">
          <Link to="/">Home</Link>
        </li>
        {!authenticated ? (
          <>
            <li className="navbar-li">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar-li">
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="navbar-li">
            <a onClick={() => setAuthenticated(false)}>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

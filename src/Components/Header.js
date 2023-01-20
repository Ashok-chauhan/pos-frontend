import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";

import {
  FaLaptopHouse,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
const Header = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = sessionStorage.getItem("sessLoggedIn");
  //bg-body-tertiary
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          POS@PINGA.US
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <FaLaptopHouse size="2em" /> Dashboard
                </Link>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaSignInAlt size="2em" /> Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/sell">
                  <FaShoppingCart size="2em" />
                  Sell
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  <FaSignOutAlt size="2em" /> Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

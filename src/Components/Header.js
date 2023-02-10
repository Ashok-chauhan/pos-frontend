import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/auth-context";
import "../App.css";

import {
  FaLaptopHouse,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
  FaListUl,
  FaHandsHelping,
  FaIdCard,
  FaBoxOpen,
} from "react-icons/fa";
const Header = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = sessionStorage.getItem("sessLoggedIn");
  //bg-body-tertiary
  return (
    <nav className="navbar navbar-expand-lg header">
      <div className="container-fluid">
        <Link className="navbar-brand header" to="/">
          POS@PINGA.US
        </Link>
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
                <Link className="nav-link header" to="/dashboard">
                  <FaLaptopHouse size="2em" /> Dashboard
                </Link>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/login">
                  <FaSignInAlt size="2em" /> Login
                </Link>
              </li>
            )}

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/register">
                  <FaSignInAlt size="2em" /> Registration
                </Link>
              </li>
            )}

            {/* {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/sell">
                  <FaShoppingCart size="2em" />
                  Sell
                </Link>
              </li>
            )} */}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/sales">
                  <FaShoppingCart size="2em" /> Sales
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/category">
                  <FaListUl size="2em" /> Category
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/product">
                  <FaBoxOpen size="2em" /> Products
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/customer/add">
                  <FaIdCard size="2em" /> Add customer
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link header" to="/logout">
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

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/auth-context";

const Logout = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  authCtx.logout();
  sessionStorage.removeItem("sessLoggedIn");

  useEffect(() => {
    navigate("/");
  }, []);
};

export default Logout;

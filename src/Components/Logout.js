import { useContext } from "react";

import AuthContext from "../store/auth-context";

const Logout = () => {
  const authCtx = useContext(AuthContext);
  authCtx.logout();
  sessionStorage.removeItem("sessLoggedIn");
};

export default Logout;

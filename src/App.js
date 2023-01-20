import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Login from "./pages/Login";
import About from "./pages/About";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Sell from "./pages/Sell";
import Logout from "./Components/Logout";
function App() {
  const authCtx = useContext(AuthContext);
  let loggedInUser = sessionStorage.getItem("sessLoggedIn");

  return (
    // <Container>
    //   <Row>
    //     <h1>It works!</h1>;
    //   </Row>
    // </Container>
    <Container>
      <Header />
      <Row>
        <Routes>
          {!loggedInUser && <Route exact path="/" element={<Login />} />}
          {loggedInUser && <Route path="/dashboard" element={<Dashboard />} />};
          {loggedInUser && <Route path="/sell" element={<Sell />} />};
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Row>
    </Container>
  );
}

export default App;

import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Login from "./pages/Login";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Category from "./pages/Category";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Logout from "./Components/Logout";
import Desktop from "./images/desktop2.jpg";
import Cafe from "./images/cafe.jpg";
import Fruits from "./images/fruits.jpg";
import Restorent from "./images/restourant.jpg";
import FoodTruck from "./images/food-truck.jpg";
import Product from "./pages/Product";
function App() {
  const authCtx = useContext(AuthContext);
  let loggedInUser = sessionStorage.getItem("sessLoggedIn");

  return (
    // <Container>
    //   <Row>
    //     <h1>It works!</h1>;
    //   </Row>
    // </Container>
    <Container fluid>
      <Header />
      <Row>
        <Routes>
          {!loggedInUser && (
            <Route
              exact
              path="/"
              element={
                <Home
                  Desktop={Desktop}
                  Cafe={Cafe}
                  Fruits={Fruits}
                  Restorent={Restorent}
                  FoodTruck={FoodTruck}
                />
              }
            />
          )}
          {!loggedInUser && (
            <Route exact path="/register" element={<Users />} />
          )}
          {!loggedInUser && <Route exact path="/login" element={<Login />} />}
          {loggedInUser && <Route path="/dashboard" element={<Dashboard />} />};
          {loggedInUser && <Route path="/product" element={<Product />} />};
          {/* {loggedInUser && <Route path="/sell" element={<Sell />} />}; */}
          {loggedInUser && <Route path="/category" element={<Category />} />};
          {loggedInUser && <Route path="/sales" element={<Sales />} />};
          {loggedInUser && (
            <Route path="/customer/add" element={<Customers />} />
          )}
          ;{/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Row>
    </Container>
  );
}

export default App;

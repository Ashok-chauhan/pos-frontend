import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

import postData from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
const Customers = () => {
  const [customer, setCustomer] = useState(false);
  const nameRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const cityRef = useRef();
  const pincodeRef = useRef();
  const phoneRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const email = emailRef.current.value;
    const city = cityRef.current.value;
    const pincode = pincodeRef.current.value;
    const phone = phoneRef.current.value;

    if (!name || !phone || name === "" || phone === "") return false;

    postData(CONFIG.URL + "/customer/add", {
      name,
      address,
      email,
      city,
      pincode,
      phone,
    })
      .then((data) => {
        if (data.success) {
          nameRef.current.value = "";
          addressRef.current.value = "";
          emailRef.current.value = "";
          cityRef.current.value = "";
          pincodeRef.current.value = "";
          phoneRef.current.value = "";
          setCustomer(true);
          setTimeout(() => {
            navigate("/sales");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="text-center p-2"> Add Customer</h2>
      {customer && (
        <Toast>
          <Toast.Body>Customer added successfully.</Toast.Body>
        </Toast>
      )}
      ;
      <div className="col-md-4 offset-md-4  p-3 mb-5 bg-body rounded">
        <form>
          <div className="form-outline mb-4">
            <input
              type="phone"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="form-control border border-warning"
              required
              ref={phoneRef}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="form-control border border-warning"
              required
              ref={nameRef}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className="form-control"
              ref={emailRef}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="form-control"
              ref={addressRef}
            />
          </div>

          <div className="form-outline mb-4">
            <input
              type="text"
              id="city"
              placeholder="City"
              className="form-control"
              ref={cityRef}
            />
          </div>

          {/* <!-- Password input --> */}

          <div className="form-outline mb-4">
            <input
              type="text"
              id="pincode"
              placeholder="Pincode"
              className="form-control"
              ref={pincodeRef}
            />
          </div>

          {/* <!-- 2 column grid layout for inline styling --> */}
          <div className="row mb-4">
            <div className="col d-flex justify-content-center"></div>
          </div>

          {/* <!-- Submit button --> */}
          <div className="d-grid gap-2">
            {/* {isLoading && <p>Sending request...</p>} */}
            <button
              type="button"
              className="btn btn-secondary "
              onClick={submitHandler}
            >
              Create customer
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Customers;

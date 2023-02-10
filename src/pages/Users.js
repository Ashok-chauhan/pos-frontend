import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

import postData from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
const Users = () => {
  const [user, setUser] = useState(false);
  const nameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const first_name = nameRef.current.value;
    const last_name = lastNameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    if (
      !first_name ||
      !last_name ||
      first_name === "" ||
      last_name === "" ||
      password === ""
    )
      return false;

    postData(CONFIG.URL + "/dashboard/register", {
      first_name,
      last_name,
      email,
      password,
    })
      .then((data) => {
        if (data.success) {
          nameRef.current.value = "";
          lastNameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";

          setUser(true);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="text-center p-2">Get started!</h2>
      {user && (
        <Toast>
          <Toast.Body>Account created successfully.</Toast.Body>
        </Toast>
      )}
      ;
      <div className="col-md-4 offset-md-4  p-3 mb-5 bg-body rounded">
        <form>
          <label className="form-label" htmlFor="name">
            First Name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              required
              ref={nameRef}
            />
          </div>

          <label className="form-label" htmlFor="last name">
            Last Name
          </label>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="last name"
              name="last name"
              className="form-control"
              required
              ref={lastNameRef}
            />
          </div>

          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email"
              className="form-control"
              ref={emailRef}
            />
          </div>

          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              ref={passwordRef}
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
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Users;

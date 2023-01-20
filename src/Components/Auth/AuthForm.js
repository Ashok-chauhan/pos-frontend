import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail);
    console.log(enteredPassword);
    //const url = "http://localhost:3001/api/v1/useLogin";
    const url = "http://posapi.pinga.us/api/v1/useLogin";
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      mode: "cors",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        //console.log(data);
        authCtx.login(data.token);
        sessionStorage.setItem("sessLoggedIn", data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    // <div className="d-flex align-items-center justify-content-center">
    <div className="col-md-4 offset-md-4 shadow p-3 mb-5 bg-body rounded">
      <form>
        {/* <!-- Email input --> */}
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="email"
            className="form-control"
            ref={emailInputRef}
          />
        </div>

        {/* <!-- Password input --> */}
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            ref={passwordInputRef}
          />
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center"></div>
        </div>

        {/* <!-- Submit button --> */}
        <div className="d-grid gap-2">
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className="btn btn-secondary "
            onClick={submitHandler}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

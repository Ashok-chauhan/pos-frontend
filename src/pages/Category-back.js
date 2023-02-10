import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";

import postData from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
const Category = () => {
  const [category, setCategory] = useState(false);
  const nameRef = useRef();

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;

    if (!name || name === "") return false;

    postData(CONFIG.URL + "/dashboard/category", {
      name,
    })
      .then((data) => {
        if (data.success) {
          nameRef.current.value = "";

          setCategory(true);
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
      <h2 className="text-center p-2">Add Category</h2>
      {category && (
        <Toast>
          <Toast.Body>Category created successfully.</Toast.Body>
        </Toast>
      )}
      ;
      <div className="col-md-4 offset-md-4  p-3 mb-5 bg-body rounded">
        <form>
          <label className="form-label" htmlFor="name">
            Category name
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

          {/* <!-- Submit button --> */}
          <div className="d-grid gap-2">
            {/* {isLoading && <p>Sending request...</p>} */}
            <button
              type="button"
              className="btn btn-secondary "
              onClick={submitHandler}
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Category;

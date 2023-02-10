import { useState, useEffect, useCallback } from "react";
import * as CONFIG from "../utils/Configuration";
const CategoryItems = (props) => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = (e) => {
    e.preventDefault();
    console.log(e.target.textContent);
    e.target.className = "bg-success text-light m-2 p-2";

    //alert(e.target.value);
    props.onSave(e.target.textContent);
  };
  const getcat = useCallback(() => {
    const url = CONFIG.URL + "/category";
    setIsLoading(true);
    fetch(url, {
      method: "GET",
      mode: "cors",
      referrerPolicy: "no-referrer",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("sessLoggedIn"),
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
        setCategory(data.categories);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    getcat();
  }, [getcat]);

  const catList = category.map((cat) => {
    return (
      // <div
      //   className="bg-info m-2 p-2 col d-flex flex-wrap justify-content-between col-md-4"
      //   key={cat._id}
      // >
      //   {cat.name}
      // </div>
      <>
        <div
          className="bg-info m-2 p-2 "
          id={cat._id}
          key={cat._id}
          onClick={clickHandler}
        >
          {cat.name}
        </div>
      </>
      // <>{cat.name}</>
    );
  });

  return (
    <>
      <div className="col d-flex flex-wrap justify-content-between">
        {isLoading && <p>Sending request...</p>}
        {catList}
      </div>
    </>
  );
};

export default CategoryItems;

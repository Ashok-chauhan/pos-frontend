import React, { useState, useEffect, useCallback } from "react";
import postData from "../utils/postData";
import CategoryItems from "../Components/CategoryItems";
const Sell = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [itemid, setItemid] = useState("");
  const [itemname, setItemname] = useState("");

  //const getcat = useCallback(() => {
  const getcat = () => {
    const url = "https://posapi.pinga.us/api/v1/category";
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
  };

  const phoneChangeHandler = (event) => {
    setPhone(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };
  const discountChangeHandler = (event) => {
    setDiscount(event.target.value);
  };

  const clickHandler = (e) => {
    e.preventDefault();
    //console.log(e.target.textContent);
    setItemname(e.target.textContent);
    setItemid(e.target.id);
    //console.log(itemid);
    e.target.className =
      "border border-info border-2 rounded-1 pe  m-2 p-2 w-25";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const soldItem = {
      product_name: itemname,
      customer_phone: phone,
      amount: amount,
      discount: discount,
    };
    setIsLoadingForm(true);
    postData("https://posapi.pinga.us/api/v1/bill", soldItem).then((data) => {
      setIsLoadingForm(false);
      console.log(data); // JSON data parsed by `data.json()` call
    });
    setPhone("");
    setName("");
    setAmount("");
    setDiscount("");
    console.log("Phone ## " + phone);
  };

  useEffect(() => {
    getcat();
  }, []);

  const catList = category.map((cat) => {
    return (
      <>
        {!itemid.includes(cat._id) && (
          //console.log('info ' + cat._id +' itemid' + itemid);
          <div
            className="bg-light border border-secondary rounded-1 m-2 p-2 w-25 "
            role="button"
            key={cat._id}
            id={cat._id}
            onClick={clickHandler}
          >
            {cat.name}
          </div>
        )}
        {itemid.includes(cat._id) && (
          <div
            className="border border-info border-2 rounded-1 m-2 p-2 w-25 "
            role="button"
            id={cat._id}
            key={cat._id}
            onClick={clickHandler}
          >
            {cat.name}
          </div>
        )}
      </>
    );
  });

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="col-sm-12 col-md-6 p-3">
            {/* <form> */}
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <h5 className="card-header">Categories</h5>
              <div className="card-body">
                {/* <CategoryItems onSave={categoryData} /> */}
                <div className="col d-flex flex-wrap justify-content-between">
                  {isLoading && (
                    <p className="text-warning bg-light text-center">
                      Sending request...
                    </p>
                  )}
                  {catList}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-6 p-3">
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <h5 className="card-header">POS</h5>
              {isLoadingForm && (
                <p className="text-warning bg-light text-center">
                  Sending request...
                </p>
              )}
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="Phone No."
                    aria-describedby="phone"
                    onChange={phoneChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={nameChangeHandler}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={amount}
                    placeholder="Amount"
                    onChange={amountChangeHandler}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="discount"
                    name="discount"
                    value={discount}
                    placeholder="discount"
                    onChange={discountChangeHandler}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    //onClick={clickHandler}
                    className="btn btn-light btn-outline-secondary"
                  >
                    Submit
                  </button>
                </div>
                {/* </form > */}
              </div>
            </div>
            {/* <!--end of card --> */}
          </div>
        </div>
      </form>
    </>
  );
};

export default Sell;

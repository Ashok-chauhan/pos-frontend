import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import postData, { getData } from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
import Products from "../Components/products/Products";

const Sales = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCustomer, setNewCustomer] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const [product, setProduct] = useState([]);

  const getcat = () => {
    const url = CONFIG.URL + "/dashboard/category";
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

    console.log(event.target.value);
    if (event.target.value.length >= 10) {
      setIsLoadingForm(true);
      postData(CONFIG.URL + "/customer/check", {
        phone: event.target.value,
      }).then((data) => {
        setIsLoadingForm(false);
        //console.log(data); // JSON data parsed by `data.json()` call
        if (data.success) {
          setName(data.customer.name);
          setNewCustomer(false);
        } else {
          setName("");
          setNewCustomer(true);
        }
      });
    }
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

  const radioChangeHandler = (event) => {
    setPaymentMode(event.target.value);
  };

  const productName = (product) => {
    setProduct(product);
  };

  const clickHandler = (e) => {
    e.preventDefault();

    // setCategoryName(e.target.textContent);
    setCategoryId(e.target.id);

    // e.target.className =
    // "border border-info border-2 rounded-1 pe  m-2 p-2 w-25";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const soldItem = {
      product_name: product, //categoryName,
      customer_phone: phone,
      amount: amount,
      discount: discount,
      payment_mode: paymentMode,
    };
    console.log(soldItem);
    setIsLoadingForm(true);
    postData(CONFIG.URL + "/bill", soldItem).then((data) => {
      setIsLoadingForm(false);
      console.log(data); // JSON data parsed by `data.json()` call
    });
    setPhone("");
    setName("");
    setAmount("");
    setDiscount("");
    setPaymentMode("");
    setProduct("");

    console.log("Phone ## " + phone);
  };

  useEffect(() => {
    getcat();
  }, []);

  const catList = category.map((cat) => {
    return (
      <>
        {!categoryId.includes(cat._id) && (
          <div
            className="bg-light border border-secondary rounded-1 m-2 p-2 category "
            role="button"
            key={cat._id}
            id={cat._id}
            onClick={clickHandler}
          >
            {cat.name}
          </div>
        )}
        {categoryId.includes(cat._id) && (
          <div
            className="border bg-success text-white rounded-1 m-2 p-2 category "
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
          <div className="col-sm-12 col-md-8 p-3">
            {/* <form> */}
            <div className="card  p-3 mb-5 ">
              <h5 className="card-header">Categories</h5>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    {/* <CategoryItems onSave={categoryData} /> */}

                    <div className="col d-flex flex-wrap justify-content-between">
                      {isLoading && (
                        <span className="text-warning bg-light text-center spin"></span>
                      )}
                      {catList}
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div>
                      <h5 className="bg-light text-center">Products</h5>

                      <Products
                        categoryId={categoryId}
                        productName={productName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 p-3">
            <div className="card p-3 mb-5 ">
              <h5 className="card-header">POS</h5>
              {isLoadingForm && (
                <span className="text-warning bg-light text-center spin"></span>
              )}
              <div className="card-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control border border-warning"
                    id="phone"
                    name="phone"
                    value={phone}
                    placeholder="Phone No."
                    aria-describedby="phone"
                    required
                    onChange={phoneChangeHandler}
                    //onComplete={phoneChangeHandler}
                  />
                </div>
                {newCustomer && (
                  <Link to="/customer/add">
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm"
                    >
                      No Record: Add Customer
                    </button>
                  </Link>
                )}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control border border-warning"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Name"
                    required
                    onChange={nameChangeHandler}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control border border-warning"
                    id="amount"
                    name="amount"
                    value={amount}
                    placeholder="Amount"
                    required
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
                <h5>
                  Payment mode <span className="text-warning">*</span>
                </h5>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="cash"
                    id="cash"
                    value="cash"
                    checked={paymentMode === "cash"}
                    onChange={radioChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    Cash
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="card"
                    id="card"
                    value="card"
                    checked={paymentMode === "card"}
                    onChange={radioChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="card">
                    Card
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="other"
                    id="other"
                    value="other"
                    checked={paymentMode === "other"}
                    onChange={radioChangeHandler}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>

                <div className="d-grid gap-2 mt-4">
                  <button
                    type="submit"
                    //onClick={clickHandler}
                    className="btn  btn-secondary"
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

export default Sales;

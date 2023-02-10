import React, { useState, useEffect, useCallback } from "react";
import postData from "../utils/postData";
import * as CONFIG from "../utils/Configuration";
import "../Datepicker.css";
import PaymetMethodGraph from "../Components/PaymentMethodGraph";
import CategoryItems from "../Components/CategoryItems";

const Dashboard = () => {
  //const dateObj = new Date();
  let todayDate = new Date().toJSON().slice(0, 10);
  // let todayDate =
  //   dateObj.getFullYear() +
  //   "-" +
  //   parseInt(dateObj.getMonth() + 1) +
  //   "-" +

  const [isLoading, setIsLoading] = useState(false);
  //const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [pickdate, setpickDate] = useState(todayDate);
  const [sale, setSale] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentModeCash, setPaymentModeCash] = useState("");
  const [paymentModeOther, setPaymentModeOther] = useState("");
  const date = { date: "2023-01-03" };

  useEffect(() => {
    getDashboardData();
    getPaymentMode();
    getPaymentModeCash();
    getPaymentModeOther();
  }, [pickdate]);

  const pickDateHandler = (event) => {
    event.preventDefault();
    setpickDate(event.target.value);
  };
  const getPaymentMode = () => {
    const card = {
      date: todayDate,
      mode: "card",
    };

    postData(CONFIG.URL + "/dashboard/paymentMode", card)
      .then((data) => {
        setPaymentMode(data.paymentMode[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPaymentModeCash = () => {
    const cash = {
      date: todayDate,
      mode: "cash",
    };
    postData(CONFIG.URL + "/dashboard/paymentMode", cash)
      .then((data) => {
        //console.log(data.paymentMode[0]);
        setPaymentModeCash(data.paymentMode[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPaymentModeOther = () => {
    const other = {
      date: todayDate,
      mode: "other",
    };
    postData(CONFIG.URL + "/dashboard/paymentMode", other)
      .then((data) => {
        setPaymentModeOther(data.paymentMode[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saleObj = {};
  const getDashboardData = () => {
    setIsLoading(true);
    postData(CONFIG.URL + "/salebyDate", {
      date: pickdate,
    }).then((data) => {
      setIsLoading(false);

      saleObj.average_sale = data.toDayEarning.average_sale
        ? data.toDayEarning.average_sale.toFixed(2)
        : "0.00";
      saleObj.gross_sales = data.toDayEarning.gross_sales
        ? data.toDayEarning.gross_sales.toFixed(2)
        : "0.00";
      saleObj.net_sales = data.toDayEarning.net_sales
        ? data.toDayEarning.net_sales.toFixed(2)
        : "0.00";
      saleObj.transactions = data.toDayEarning.transactions
        ? data.toDayEarning.transactions
        : "0";
      saleObj.discount = data.toDayEarning.discount
        ? data.toDayEarning.discount
        : "0.00";
      saleObj.prevWday = data.toDayEarning.prevWday
        ? data.toDayEarning.prevWday
        : "N/A";

      //previousWeekDay

      saleObj.prevAverage_sale = data.previousWeekDay.average_sale
        ? data.previousWeekDay.average_sale.toFixed(2)
        : "0.00";
      saleObj.prevGross_sales = data.previousWeekDay.gross_sales
        ? data.previousWeekDay.gross_sales.toFixed(2)
        : "0.00";
      saleObj.PrevNet_sales = data.previousWeekDay.net_sales
        ? data.previousWeekDay.net_sales.toFixed(2)
        : "0.00";
      saleObj.PrevTransactions = data.previousWeekDay.transactions
        ? data.previousWeekDay.transactions
        : "0";
      saleObj.PrevDiscount = data.previousWeekDay.discount
        ? data.previousWeekDay.discount
        : "0.00";
      setSale(saleObj);
      //console.log(sale); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <>
      <div className="row p-3">
        <div className="col-md-8">
          <div className="card  p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {isLoading && (
                    <span className="text-warning bg-light text-center spin"></span>
                  )}

                  <input
                    type="date"
                    id="pickdate"
                    name="pickdate"
                    value={pickdate}
                    min="2018-01-01"
                    max="2030-12-31"
                    onChange={pickDateHandler}
                  />
                </div>
              </div>
              <div className="row">
                <h6 className="lead text-muted">Net Sales</h6>

                <h4>{sale.net_sales}</h4>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h6 className="lead text-muted">Gross Sales</h6>
                  <h4>{sale.gross_sales}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Prev {sale.prevWday} Grs.</h6>
                  <h4>{sale.prevGross_sales}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Transactions</h6>
                  <h4>{sale.transactions}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Prev {sale.prevWday} Trn</h6>
                  <h4>{sale.PrevTransactions}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h6 className="lead text-muted">Avg</h6>
                  <h4>{sale.average_sale}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Prev {sale.prevWday} Avg</h6>
                  <h4>{sale.prevAverage_sale}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Discount</h6>
                  <h4>{sale.discount}</h4>
                </div>
                <div className="col-md-3">
                  <h6 className="lead text-muted">Prev {sale.prevWday} Dis.</h6>
                  <h4>{sale.PrevDiscount}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <h3>Last month</h3>
            </div>
          </div>
        </div>
      </div>
      {/* Doughnut graph */}
      <div className="row">
        <div>
          <h3>Today</h3>
        </div>
        <PaymetMethodGraph
          mode={paymentMode}
          cash={paymentModeCash}
          other={paymentModeOther}
        />
      </div>
    </>
  );
};

export default Dashboard;

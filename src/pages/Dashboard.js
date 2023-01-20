import React, { useState, useEffect, useCallback } from "react";
import postData from "../utils/postData";
import "../Datepicker.css";
import CategoryItems from "../Components/CategoryItems";

const Dashboard = () => {
  const dateObj = new Date();
  let todayDate =
    dateObj.getFullYear() +
    "-" +
    dateObj.getMonth() +
    1 +
    "-" +
    dateObj.getDate();

  //const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [pickdate, setpickDate] = useState(todayDate);
  const [sale, setSale] = useState("");
  const date = { date: "2023-01-03" };

  useEffect(() => {
    getDashboardData();
  }, [pickdate]);

  const pickDateHandler = (event) => {
    event.preventDefault();
    setpickDate(event.target.value);
  };

  const saleObj = {};
  const getDashboardData = () => {
    setIsLoading(true);
    postData("http://posapi.pinga.us/api/v1/salebyDate", {
      date: pickdate,
    }).then((data) => {
      //setSale(data);
      console.log(data);
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
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {isLoading && (
                    <p className="text-warning bg-light text-center">
                      Sending request...
                    </p>
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
          <div className="card shadow p-3 mb-5 bg-body rounded">
            <div className="card-body">
              This is some text within a card body.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

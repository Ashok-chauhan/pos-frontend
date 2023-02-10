import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
const PaymetMethodGraph = (props) => {
  //console.log(props.mode.amount);
  let card = props.mode ? "Card " + props.mode.amount : "Card 0";
  let cash = props.cash ? "Cash " + props.cash.amount : "Cash 0";
  let other = props.other ? "Other " + props.other.amount : "Other 0";

  let cardCount = props.mode ? props.mode.count : "0";
  let cashCount = props.cash ? props.cash.count : "0";
  let otherCount = props.other ? props.other.count : "0";

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [cash, card, other],
    datasets: [
      {
        label: "# of Transactions",
        data: [cashCount, cardCount, otherCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-md-4">
      <div className="p-3 mb-5 bg-body rounded">
        <h4>Payment types</h4>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default PaymetMethodGraph;

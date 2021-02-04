import React, { useEffect, useState } from "react";

import { db } from "./firebase";

import { Line } from "react-chartjs-2";
// import StockDataApi from "./StockDataApi";
const BASE_URL = "https://finnhub.io/api/v1/quote/c09idmf48v6trcjbqet0";
const TOKEN = "c09idmf48v6trcjbqet0";

function LineGraph() {
  const [graphData, setGraphData] = useState([]);
  const data = [
    {
      x: 10,
      y: 20,
    },
    {
      x: 15,
      y: 10,
    },
  ];

  const createMockData = () => {
    let data = [];
    let value = 50;
    for (var i = 0; i < 366; i++) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(i);
      value = value += Math.round(
        (Math.random() < 0.5 ? 1 : 0) * Math.random() * 10
      );
      // console.log("This is the fucking function", value));
      data.push({ x: date, y: value });
    }
    setGraphData(data);
  };
  useEffect(() => {
    createMockData();
  }, []);
  return (
    <div className="linegraph">
      <Line
        data={{
          datasets: [
            {
              type: "line",
              data: graphData,
              backgroundColor: "black",
              borderColor: "#5Ac53B",
              borderWidth: 2,
              pointBorderColor: "rgba(0, 0, 0, 0)",
              pointBackgroundColor: "rgba(0, 0, 0, 0)",
              pointHoverBackgroundColor: "5Ac53B",
              pointHoverBorderColor: "#000000",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 6,
            },
          ],
        }}
        options={{
          legend: {
            display: false,
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  format: "DD/MM/YY",
                  tooltipFormat: "ll",
                },
                ticks: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
          },
        }}
        type="Line"
      />
    </div>
  );
}

export default LineGraph;

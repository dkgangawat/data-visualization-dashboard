import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

import axios from "axios";


const BarChart = ({ labels, barData}) => {

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Value",
        data: barData,
        backgroundColor: ["rgba(116, 123, 245, 0.7)"],
        borderColor: ["rgba(116, 123, 245, 1)"],
      },
    ],
  };


  return (
    <>
    <span className=" text-sm tracking-wider text-gray-400 py-2">Intensity Count</span>
      <Bar data={data} />

    </>
  );
};

export default BarChart;

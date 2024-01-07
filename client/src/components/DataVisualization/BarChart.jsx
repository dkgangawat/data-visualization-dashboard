import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

import axios from "axios";

const BarChart = ({ labels, barData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Intensity",
        data: barData,
        backgroundColor: ["rgba(116, 123, 245, 0.7)"],
        borderColor: ["rgba(116, 123, 245, 1)"],
      },
    ],
  };

  return (
    <>
      <span className=" text-sm tracking-wider text-gray-400 py-2">
        Intensity Count
      </span>
      <Bar data={data} />
      <span className=" text-sm text-gray-400 mt-3 w-full text-center block p-4">
        Intensity wise distribution of documents
      </span>
    </>
  );
};

export default BarChart;

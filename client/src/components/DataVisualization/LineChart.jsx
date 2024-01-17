import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  // Combine unique labels from startYear and endYear
  const combinedLabels = Array.from(
    new Set([...data.startYear.labels, ...data.endYear.labels])
  ).sort();

  
  const datasets = [
    {
      label: "Start Year",
      data: combinedLabels.map((label) =>
        label !== "" && data.startYear.labels.includes(label)
          ? data.startYear.data[data.startYear.labels.indexOf(label)]
          : null
      ),
      backgroundColor: "rgba(116, 123, 245, 0.7)",
      borderColor: "rgba(116, 123, 245, 1)",
      lineTension: 0.3,
    },
    {
      label: "End Year",
      data: combinedLabels.map((label) =>
        label !== "" && data.endYear.labels.includes(label)
          ? data.endYear.data[data.endYear.labels.indexOf(label)]
          : null
      ),
      backgroundColor: "rgba(245, 123, 116, 0.7)",
      borderColor: "rgba(245, 123, 116, 1)",
      lineTension: 0.3,
    },
  ];

  const dataValue = {
    labels: combinedLabels,
    datasets: datasets,
  };

  return (
    <div>
      <span className=" text-sm tracking-wider text-gray-400 py-2">
        Start year & End year
      </span>
      <Line data={dataValue} />
    </div>
  );
};

export default LineChart;

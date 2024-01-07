import React from "react";
import { Bar } from "react-chartjs-2";

const StackedBar = ({ data }) => {
  const combinedLabels = Array.from(
    new Set([...data.likelihood.labels, ...data.relevance.labels])
  ).sort();
  const likelihoodData = combinedLabels.map((label) => {
    const index = data.likelihood.labels.indexOf(label);
    return index === -1 ? 0 : data.likelihood.data[index];
  });
  const relevanceData = combinedLabels.map((label) => {
    const index = data.relevance.labels.indexOf(label);
    return index === -1 ? 0 : data.relevance.data[index];
  });

  const dataValue = {
    labels: combinedLabels,
    datasets: [
      {
        label: "Likelihood",
        data: likelihoodData,
        backgroundColor: '#748196',
      },
      {
        label: "Relevance",
        data: relevanceData,
        backgroundColor: "#6ffecd",
      },
    ],
  };
  return (
    <>
      <Bar data={dataValue} options={{ scales: { x: { stacked: true }, y:{stacked:true} } }} />
    </>
  );
};

export default StackedBar;

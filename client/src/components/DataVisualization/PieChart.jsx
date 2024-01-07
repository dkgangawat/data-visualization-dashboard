import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { IoIosArrowRoundBack } from "react-icons/io";
import IconButton from "../IconButton";
const PieChart = ({ data }) => {
  const [selectedSector, setSelectedSector] = useState(null);
  const [labels, setLabels] = useState(data.sectorLabels);
  const [dataValue, setDataValue] = useState(data.sectorData);
  const [showingTopic, setShowingTopic] = useState(false);

  const handleClick = (element) => {
    if (showingTopic) return;
    if (element[0]) {
      const sectorIndex = element[0].index;
      const selectedSectorLabel = data.sectorLabels[sectorIndex];
      setSelectedSector(selectedSectorLabel);
      console.log(data.topicLabels[sectorIndex], data.topicData[sectorIndex]);
      setLabels(data.topicLabels[sectorIndex]);
      setDataValue(data.topicData[sectorIndex]);
      setShowingTopic(true);
    }
  };
  const chartData = {
    labels: labels,
    datasets: [
      {
        // label: labels,
        data: dataValue,
        backgroundColor: chartColors,
        borderColor: chartColors,
      },
    ],
  };

  return (
    <div>
      <div className=" flex items-center">
        {showingTopic && (
          <IconButton
            onClick={() => {
              setSelectedSector(null);
              setLabels(data.sectorLabels);
              setDataValue(data.sectorData);
              setShowingTopic(false);
            }}
            className=" inline-block"
          >
            <IoIosArrowRoundBack />
          </IconButton>
        )}
        <span className=" text-sm tracking-wider text-gray-400 py-2">
          {selectedSector ? " Topic " + selectedSector : "Sector, click on the specific sector to view topics"}
        </span>
      </div>

      <Doughnut
        data={chartData}
        options={{
          onClick: (_, elements) => handleClick(elements),
          aspectRatio: 2,
          responsive: true,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 10,
                },
                boxWidth: 10,
              },
            },
          },
        }}
      />
      <span className=" text-sm text-gray-400 mt-3 w-full text-center block p-4">
        {showingTopic ? "Topic" : "Sector"} wise distribution of documents
      </span>
    </div>
  );
};

export default PieChart;

const chartColors = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(237, 85, 101, 0.8)",
  "rgba(0, 128, 128, 0.8)",
  "rgba(255, 99, 71, 0.8)",
  "rgba(46, 139, 87, 0.8)",
  "rgba(255, 140, 0, 0.8)",
  "rgba(30, 144, 255, 0.8)",
  "rgba(255, 215, 0, 0.8)",
  "rgba(255, 105, 180, 0.8)",
  "rgba(70, 130, 180, 0.8)",
  "rgba(0, 139, 139, 0.8)",
  "rgba(255, 20, 147, 0.8)",
  "rgba(0, 0, 128, 0.8)",
  "rgba(128, 0, 128, 0.8)",
];

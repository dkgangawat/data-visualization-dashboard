import React, { useState } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import { IoIosArrowRoundBack } from "react-icons/io";
import IconButton from "../IconButton";
const PieChart = ({ data }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [labels, setLabels] = useState(data.regionLabels);
  const [dataValue, setDataValue] = useState(data.regionData);
  const [showingCountry, setShowingCountry] = useState(false);

  const handleClick = (element) => {
    if (showingCountry) return;
    if (element[0]) {
      const regionIndex = element[0].index;
      const selectedRegionLabel = data.regionLabels[regionIndex];
      setSelectedRegion(selectedRegionLabel);
      console.log(data.countryLabels[regionIndex], data.countryData[regionIndex]);
      setLabels(data.countryLabels[regionIndex]);
      setDataValue(data.countryData[regionIndex]);
      setShowingCountry(true);
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
        {showingCountry && (
          <IconButton
            onClick={() => {
              setSelectedRegion(null);
              setLabels(data.regionLabels);
              setDataValue(data.regionData);
              setShowingCountry(false);
            }}
            className=" inline-block"
          >
            <IoIosArrowRoundBack />
          </IconButton>
        )}
        <span className=" text-sm tracking-wider text-gray-400 py-2">
          {selectedRegion ? " Country " + selectedRegion : "Region, click on the specific Region to view Countrys"}
        </span>
      </div>

      <PolarArea
        data={chartData}
        options={{
          onClick: (_, elements) => handleClick(elements),
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
      <span className=" text-sm text-gray-400 mt-3 w-full text-center block p-4">
        {showingCountry ? "Country" : "Region"} wise distribution of documents
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

import React, { useEffect } from "react";
import BarChart from "../components/DataVisualization/BarChart";
import { useSelector } from "react-redux";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  defaults,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
  
} from "chart.js";
import axios from "axios";
import PieChart from "../components/DataVisualization/PieChart";
import LineChart from "../components/DataVisualization/LineChart";
import PolarChart from "../components/DataVisualization/PolarChart";
import StackedBar from "../components/DataVisualization/StackedBar";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  DoughnutController,
  ArcElement,
  Legend,
  Title,
  Tooltip,
  LineController,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,

);
// defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
  const [barData, setBarData] = React.useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/data/bar`
    );
    setBarData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(barData);

  return (
    <>
      {barData ? (
        <>
          <section className=" p-4">
            <h1 className=" text-2xl  mb-2 text-gray-500">Dashboard</h1>
            <div className=" border w-fit rounded-md py-2 px-5 flex items-center gap-5 select-none shadow cursor-pointer transition-all duration-300 hover:shadow-lg  hover:scale-105 ">
              <span className=" text-gray-600 font-bold tracking-wider">
                Total
                <br />
                <span className=" text-xs text-gray-600 font-light">
                  Documents
                </span>
              </span>
              <div className="text-green-500 font-semibold tracking-wider w-20 h-20 border ring-4 ring-orange-100 flex justify-center items-center rounded-[50%] ">
                <span className=" x">{barData?.totalDocuments}</span>
              </div>
            </div>
          </section>
          <section className="flex flex-wrap md:flex-nowrap p-4 gap-4  justify-between">
            <div className=" max-h-[500px] flex-1 md:w-1/2 border p-2 shadow rounded-md">
              <BarChart labels={barData?.labels} barData={barData?.data} />
            </div>
            <div className=" max-h-[500px] flex-1 border p-2 shadow  rounded-md">
              <PieChart data={barData.sectorChartData} />
            </div>
          </section>
          <section className="flex flex-wrap md:flex-nowrap p-4 gap-4  justify-between">
            <div className=" max-h-[500px]  w-full  md:w-2/3 border p-2 shadow rounded-md">
              <LineChart data={barData.years} />
            </div>
            <div className=" max-h-[500px] flex-1 border p-2 shadow  rounded-md">
              <PolarChart data={barData.countryAndRegion} />
            </div>
          </section>
          <section className="flex flex-wrap md:flex-nowrap p-4 gap-4  justify-between">
            <div className=" max-h-[500px]  w-full  md:w-1/2 border p-2 shadow rounded-md">
              <StackedBar data={{likelihood:barData.likelihood,relevance:barData.relevance}} />
            </div>
            <div className=" max-h-[500px] flex-1 border p-2 shadow  rounded-md">
            </div>
          </section>
        </>
      ) : (
        <div className=" flex justify-center items-center h-screen">
          <div className=" animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-700"></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

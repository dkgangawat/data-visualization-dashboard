import React from "react";
import {Bar} from "react-chartjs-2";
const BarChart = ({data}) => {
    const congif = {
        type:"bar",
        data:data,
        options:{
            scales:{
                y:{
                    beginAtZero:true
                }
            }
        }
        
    }


  return (
    <>
      <div className=" border rounded-md flex-1">
        <h1 className="">intensity Bar Graph</h1>
        {/* <Bar data={data} /> */}

      </div>
    </>
  );
};

export default BarChart;

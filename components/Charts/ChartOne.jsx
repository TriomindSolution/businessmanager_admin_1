import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { PAIDORCANCEL_END_POINT } from "@/constants/api_endpoints/paidOrcancel";
import Axios from "@/utils/axios";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartOne = () => {
  const [timePeriod, setTimePeriod] = useState(2); // Default to "Month"
  const [chartData, setChartData] = useState({
    month: [],
    paidOrder: [],
    cancelOrder: [],
  });
  const { http } = Axios();

  useEffect(() => {
    fetchData(timePeriod);
  }, [timePeriod]);

  const fetchData = async (type) => {
    try {
      // const response = await Axios.get(`${PAIDORCANCEL_END_POINT}?type=${2}`);
      // const response = await Axios.get(`${PAIDORCANCEL_END_POINT}?type=${2}`);
      const response = await http.get(PAIDORCANCEL_END_POINT.get(timePeriod));

      const data = response.data;
      console.log("Fetched Data:", data);
  
      setChartData({
        month: data.orderStatistics[0]?.month || [],
        paidOrder: data.orderStatistics[0]?.paidOrder || [],
        cancelOrder: data.orderStatistics[0]?.cancelOrder || [],
      });
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };




  const handleButtonClick = (type) => {
    setTimePeriod(type); // Update state to trigger `useEffect` and fetch data
  };

  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: "category",
      categories: chartData.month,
    },
    yaxis: {
      min: 0,
      max: Math.max(...chartData.paidOrder, ...chartData.cancelOrder, 10), // Add a buffer if data is sparse
    },
    
  };

  const series = [
    {
      name: "Paid Order",
      data: chartData.paidOrder,
    },
    {
      name: "Cancel Order",
      data: chartData.cancelOrder,
    },
  ];

  console.log("Chart Data:", chartData);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          className={`btn ${timePeriod === 1 ? "active" : ""}`}
          onClick={() => handleButtonClick(1)}
        >
          Day
        </button>
        <button
          className={`btn ${timePeriod === 2 ? "active" : ""}`}
          onClick={() => handleButtonClick(2)}
        >
          Month
        </button>
        <button
          className={`btn ${timePeriod === 3 ? "active" : ""}`}
          onClick={() => handleButtonClick(3)}
        >
          Year
        </button>
      </div>
      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ChartOne;

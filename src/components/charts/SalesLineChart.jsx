import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

// todo: add chart
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const SalesLineChart = ({ sales }) => {
  const [chartType, setChartType] = React.useState("daily");
  const revenueByDate = sales.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.sale_sub_total;
    return acc;
  }, {});

  const dates = Object.keys(revenueByDate).sort();
  const revenues = dates.map((date) => revenueByDate[date]);

  //by month
  const revenueByMonth = sales.reduce((acc, sale) => {
    //sort month from Jan to Dec
    const month = sale.date.split("-")[1];
    acc[month] = (acc[month] || 0) + sale.sale_sub_total;
    return acc;
  }, {});

  const months = Object.keys(revenueByMonth).sort();
  const monthlyRevenues = months.map((month) => revenueByMonth[month]);

  const lineChartData = {
    labels: chartType === "daily" ? dates : months,
    datasets: [
      {
        label: "Total Revenue",
        data: chartType === "daily" ? revenues : monthlyRevenues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (USD)",
        },
      },
    },
  };

  return (
    <div className="w-full h-96 relative">
      <div className="flex justify-end mb-4 absolute -top-10 right-0">
        <button
          onClick={() => setChartType("daily")}
          className={`p-2 ${
            chartType === "daily"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-l`}
        >
          Daily
        </button>
        <button
          onClick={() => setChartType("monthly")}
          className={`p-2 ${
            chartType === "monthly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-r`}
        >
          Monthly
        </button>
      </div>
      <Line data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default SalesLineChart;

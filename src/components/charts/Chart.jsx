import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register required components
ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Chart = ({ sales }) => {
  const totalRevenueByCustomer = sales.reduce((acc, sale) => {
    const customerName = sale.name.trim() === "" ? "Customer A" : sale.name;
    if (!acc[customerName]) {
      acc[customerName] = 0;
    }
    acc[customerName] += sale.sale_total_cost;
    return acc;
  }, {});

  const customerName = Object.keys(totalRevenueByCustomer);
  const revenue = Object.values(totalRevenueByCustomer);

  console.log(customerName);

  const topCustomer = customerName.reduce(
    (top, current, index) => {
      return revenue[index] > top[1] ? [current, revenue[index]] : top;
    },
    ["", 0]
  );

  const pieChartData = {
    labels: customerName,
    datasets: [
      {
        data: revenue,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-2xl font-semibold mb-4">Revenue by Customer</h3>
      <div className="h-[300px] ">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default Chart;

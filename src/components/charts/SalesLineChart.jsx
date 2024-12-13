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

// Register Chart.js modules
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

  // Aggregate revenue by day
  const revenueByDate = sales.reduce((acc, sale) => {
    const date = sale.date;
    acc[date] = (acc[date] || 0) + sale.sale_sub_total;
    return acc;
  }, {});
  const dates = Object.keys(revenueByDate).sort();
  const dailyRevenues = dates.map((date) => revenueByDate[date]);

  // Aggregate revenue by month
  const revenueByMonth = sales.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + sale.sale_sub_total;
    return acc;
  }, {});
  const months = Object.keys(revenueByMonth).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const monthlyRevenues = months.map((month) => revenueByMonth[month]);

  // Chart data
  const lineChartData = {
    labels: chartType === "daily" ? dates : months,
    datasets: [
      {
        label: `Revenue (${chartType === "daily" ? "Daily" : "Monthly"})`,
        data: chartType === "daily" ? dailyRevenues : monthlyRevenues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart options
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
        callbacks: {
          label: (tooltipItem) =>
            `$${tooltipItem.raw.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: chartType === "daily" ? "Date" : "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue (USD)",
        },
        ticks: {
          callback: (value) =>
            `$${value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
        },
      },
    },
  };

  // Summary statistics
  const totalRevenue =
    chartType === "daily"
      ? dailyRevenues.reduce((sum, revenue) => sum + revenue, 0)
      : monthlyRevenues.reduce((sum, revenue) => sum + revenue, 0);
  const highestRevenue =
    chartType === "daily"
      ? Math.max(...dailyRevenues)
      : Math.max(...monthlyRevenues);
  const highestRevenueLabel =
    chartType === "daily"
      ? dates[dailyRevenues.indexOf(highestRevenue)]
      : months[monthlyRevenues.indexOf(highestRevenue)];

  return (
    <div className="w-full h-auto p-4 bg-white shadow-md rounded-lg">
      {/* Chart Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Sales Revenue Chart
          </h2>
          <p className="text-sm text-gray-600">
            {chartType === "daily" ? "Daily" : "Monthly"} Revenue Trends
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType("daily")}
            className={`px-4 py-2 rounded-l ${
              chartType === "daily"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
          >
            Daily
          </button>
          <button
            onClick={() => setChartType("monthly")}
            className={`px-4 py-2 rounded-r ${
              chartType === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-blue-50 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-900">
            $
            {totalRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-700">
            Highest Revenue
          </h3>
          <p className="text-2xl font-bold text-green-900">
            $
            {highestRevenue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p className="text-sm text-green-600">{highestRevenueLabel}</p>
        </div>
      </div>

      <div className="h-96">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default SalesLineChart;

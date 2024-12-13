import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);
const PaymentCompletion = ({ sales }) => {
  const totalCustomers = sales.length;
  const completedPayments = sales.filter((sale) => sale.balance === 0).length;
  const paymentCompletionPercentage =
    (completedPayments / totalCustomers) * 100;

  console.log(paymentCompletionPercentage);

  const data = {
    labels: ["Completed Payments", "Pending Payments"],
    datasets: [
      {
        data: [completedPayments, totalCustomers - completedPayments],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
        borderWidth: 0,
        cutout: "75%",
        rotation: 225,
        circumference: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div className="rounded-lg shadow p-4 bg-white relative">
      <h1 className="text-2xl font-bold mb-4">Payment Completion</h1>
      <div className="h-[300px]">
        <Doughnut data={data} options={options} />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-gray-800">
          {paymentCompletionPercentage.toFixed(2)}%
        </p>
        <p className="text-sm text-gray-600">Payment Completion</p>
      </div>
    </div>
  );
};

export default PaymentCompletion;

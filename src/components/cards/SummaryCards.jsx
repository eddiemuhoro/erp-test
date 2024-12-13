import { AiOutlineRise } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiPiggyBank } from "react-icons/gi";
import { GoNumber } from "react-icons/go";
import { formatCurrency } from "../../formulas/formatCurrency";

const SummaryCards = ({ sales }) => {
  const today = new Date();
  const last30Days = new Date();
  last30Days.setDate(today.getDate() - 30);

  const last60Days = new Date();
  last60Days.setDate(today.getDate() - 60);

  const salesLast30Days = sales.filter(
    (sale) => new Date(sale.date) > last30Days
  );

  const sales30To60Days = sales.filter(
    (sale) =>
      new Date(sale.date) > last60Days && new Date(sale.date) <= last30Days
  );

  const last30TotalSales = salesLast30Days.length;
  const last30TotalItemsPurchased = salesLast30Days.reduce(
    (sum, sale) => sum + parseFloat(sale.items_purchased),
    0
  );
  const last30TotalRevenue = salesLast30Days.reduce(
    (sum, sale) => sum + sale.sale_sub_total,
    0
  );

  // Metrics for 30-60 days ago
  const prev30TotalSales = sales30To60Days.length;
  const prev30TotalItemsPurchased = sales30To60Days.reduce(
    (sum, sale) => sum + parseFloat(sale.items_purchased),
    0
  );
  const prev30TotalRevenue = sales30To60Days.reduce(
    (sum, sale) => sum + sale.sale_sub_total,
    0
  );

  // Percentage change
  const percentageChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100; // Avoid division by zero
    return ((current - previous) / previous) * 100;
  };

  const salesChange = percentageChange(last30TotalSales, prev30TotalSales);
  const itemsChange = percentageChange(
    last30TotalItemsPurchased,
    prev30TotalItemsPurchased
  );
  const revenueChange = percentageChange(
    last30TotalRevenue,
    prev30TotalRevenue
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow relative">
          <div className="absolute top-1 right-2 bg-blue-200 p-2 rounded-full">
            <FaMoneyBillAlt className="text-3xl text-blue-700" />
          </div>
          <h3 className="text-lg font-semibold text-blue-700">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-900">{last30TotalSales}</p>
          <p
            className={`text-sm ${
              salesChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {salesChange > 0 ? "▲" : "▼"} {Math.abs(salesChange).toFixed(1)}%
            compared to the previous month
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg shadow relative">
          <div className="absolute top-1 right-2 bg-green-200 p-2 rounded-full">
            <GoNumber className="text-3xl text-green-700" />
          </div>
          <h3 className="text-lg font-semibold text-green-700">
            Total Items Purchased
          </h3>
          <p className="text-2xl font-bold text-green-900">
            {last30TotalItemsPurchased}
          </p>
          <p
            className={`text-sm ${
              itemsChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {itemsChange > 0 ? "▲" : "▼"} {Math.abs(itemsChange).toFixed(1)}%
            compared to the previous month
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow relative">
          <div className="absolute top-1 right-2 bg-yellow-200 p-2 rounded-full">
            <GiPiggyBank className="text-3xl text-yellow-700" />
          </div>
          <h3 className="text-lg font-semibold text-yellow-700">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-yellow-900">
            {formatCurrency(last30TotalRevenue)}
          </p>
          <p
            className={`text-sm ${
              revenueChange > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {revenueChange > 0 ? "▲" : "▼"} {Math.abs(revenueChange).toFixed(1)}
            % compared to the previous month
          </p>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg shadow relative">
          <div className="absolute top-1 right-2 bg-purple-200 p-2 rounded-full">
            <AiOutlineRise className="text-3xl text-purple-700" />
          </div>
          <h3 className="text-lg font-semibold text-purple-700">
            Average Sale Value
          </h3>
          <p className="text-2xl font-bold text-purple-900">
            {formatCurrency(last30TotalRevenue / last30TotalSales || 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;

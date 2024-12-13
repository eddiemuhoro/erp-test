import React from "react";
import { formatCurrency } from "../../formulas/formatCurrency";

const TopCustomersAndItems = ({ sales }) => {
  const customerRevenue = sales.reduce((acc, sale) => {
    acc[sale.name] = (acc[sale.name] || 0) + sale.sale_sub_total;
    return acc;
  }, {});

  const itemQuantities = sales.reduce((acc, sale) => {
    sale.items.forEach((item) => {
      acc[item.description] =
        (acc[item.description] || 0) + item.quantity_purchased;
    });
    return acc;
  }, {});

  const topCustomers = Object.entries(customerRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 7);

  const topItems = Object.entries(itemQuantities)
    .map(([description, quantity]) => ({ description, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Top 7 Customers</h1>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Rank
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Customer
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Total Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {topCustomers.map((customer, index) => (
              <tr key={customer.name} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {customer.name === "" ? "Customer A" : customer.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {formatCurrency(customer.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-4">Top 5 Selling Items</h1>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">
                Rank
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Item
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Quantity Sold
              </th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, index) => (
              <tr key={item.description} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopCustomersAndItems;

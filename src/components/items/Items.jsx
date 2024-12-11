import { useState } from "react";
import { formatCurrency } from "../../formulas/formatCurrency";

const ItemsTable = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = items.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(items.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold">Items Purchased</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300 text-left">
              Item ID
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Description
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Quantity
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Unit Price
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Total Tax
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-2 border border-gray-300">
                {item.item_id}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {item.description}
              </td>
              <td className="px-4 py-2 border border-gray-300 ">
                {item.quantity_purchased}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-right">
                {formatCurrency(item.item_unit_price)}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-right">
                {formatCurrency(item.item_total_tax)}
              </td>
              <td className="px-4 py-2 border border-gray-300 text-right">
                {formatCurrency(item.item_total_cost)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ItemsTable;

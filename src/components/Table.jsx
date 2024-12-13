import React, { useState, useEffect } from "react";
import ItemsTable from "./items/Items";
import SaleRow from "./sales_rows/SalesRow";
import SummaryCards from "./cards/SummaryCards";
import Chart from "./charts/Chart";
import SalesLineChart from "./charts/SalesLineChart";
import TopCustomersTable from "./customers/TopCustomers";
import TopCustomers from "./charts/TopCustomers";
import PaymentCompletion from "./charts/PaymentCompletion";

const Table = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/sales.json");
      const data = await response.json();
      setSalesData(data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    customer: "",
    startTotal: null,
    endTotal: null,
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredSales = salesData.filter((sale) => {
    const saleDate = new Date(sale.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    const isWithinDateRange =
      (!startDate || saleDate >= startDate) &&
      (!endDate || saleDate <= endDate);

    const matchesCustomer =
      !filters.customer ||
      sale.name.toLowerCase().includes(filters.customer.toLowerCase());

    const isWithinTotalRange =
      (!filters.startTotal || sale.sale_total_cost >= filters.startTotal) &&
      (!filters.endTotal || sale.sale_total_cost <= filters.endTotal);

    return isWithinDateRange && matchesCustomer && isWithinTotalRange;
  });

  const clearFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      customer: "",
      startTotal: null,
      endTotal: null,
    });
  };
  const appliedFiltersCount = Object.values(filters).filter(
    (value) => value !== "" && value !== null && value !== undefined
  ).length;

  console.log(filters);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sales-ERP</h1>
      <SummaryCards sales={salesData} />

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-2 bg-gray-200 text-gray-700 rounded flex items-center justify-between"
      >
        <span>{isExpanded ? "Hide Filters" : "Show Filters"}</span>
        <span>
          {appliedFiltersCount > 0 && !isExpanded
            ? `(${appliedFiltersCount} filters applied)`
            : ""}
          {isExpanded ? "▲" : "▼"}
        </span>
      </button>
      {isExpanded && (
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer
            </label>
            <input
              type="text"
              name="customer"
              value={filters.customer}
              onChange={handleFilterChange}
              placeholder="Enter customer name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Total
            </label>
            <input
              type="number"
              name="startTotal"
              value={filters.startTotal}
              onChange={handleFilterChange}
              placeholder="Enter start total"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Total
            </label>
            <input
              type="number"
              name="endTotal"
              value={filters.endTotal}
              onChange={handleFilterChange}
              placeholder="Enter end total"
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 md:mt-0 p-2 bg-gray-200 text-gray-700 rounded"
          >
            Clear Filters
          </button>
        </div>
      )}
      <section className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full md:w-2/3 h-full">
          <SalesTable salesData={filteredSales} />
          <TopCustomersTable sales={filteredSales} />
        </div>
        <div className="w-full flex flex-col gap-2 md:w-1/3">
          <SalesLineChart sales={filteredSales} />
          <Chart sales={filteredSales} />
          <PaymentCompletion sales={filteredSales} />
        </div>
      </section>
    </div>
  );
};

const SalesTable = ({ salesData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  console.log(indexOfFirstRow, indexOfLastRow);
  const currentSales = salesData?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(salesData.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full table-auto border-collapse border border-gray-300 ">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300 text-left">
              Sale ID
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">Date</th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Customer
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Items Purchased
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Subtotal
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Total Cost
            </th>
            <th className="px-4 py-2 border border-gray-300 text-left">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {currentSales.map((sale) => (
            <SaleRow key={sale.saleid} sale={sale} />
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

export default Table;

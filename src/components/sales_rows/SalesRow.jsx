import { useState } from "react";
import ItemsTable from "../items/Items";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../formulas/formatCurrency";

const SaleRow = ({ sale }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className={`cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out ${
          isExpanded ? "bg-gray-200" : "bg-white"
        }`}
      >
        <td className="px-4 py-2 border-b border-gray-300">{sale.saleid}</td>
        <td className="px-4 py-2 border-b border-gray-300">{sale.date}</td>
        <td className="px-4 py-2 border-b border-gray-300">{sale.name}</td>
        <td className="px-4 py-2 border-b border-gray-300">
          {sale.items_purchased}
        </td>
        <td className="px-4 py-2 border-b border-gray-300 text-right">
          {formatCurrency(sale.sale_sub_total)}
        </td>
        <td className="px-4 py-2 border-b border-gray-300 text-right">
          {formatCurrency(sale.sale_total_cost)}
        </td>
        <td className="px-4 py-2 border-b border-gray-300 text-right">
          {formatCurrency(sale.balance)}
        </td>
      </tr>

      {isExpanded && (
        <>
          <Link
            to={`/${sale.saleid}`}
            //new tab - detils
            target="_blank"
            className="w-48 block text-center text-blue-500 p-2 underline"
          >
            See All Details - Sale #{sale.saleid}
          </Link>
          <tr>
            <td colSpan="7" className="border-b border-gray-300">
              <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
                <ItemsTable items={sale.items} />
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default SaleRow;

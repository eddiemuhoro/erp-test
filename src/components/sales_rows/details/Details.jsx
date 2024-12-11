import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const [sale, setSale] = React.useState(null);
  const { id } = useParams();

  //simulate fetching data from json file
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/sales.json");
      const data = await response.json();
      console.log(data.data);
      const sale = data.data.find((sale) => sale.saleid === parseInt(id));
      setSale(sale);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {sale ? (
        <DetailsTable sale={sale} />
      ) : (
        <div className="p-6 text-red-600">Sale not found!</div>
      )}
    </div>
  );
};

export default DetailsPage;

const DetailsTable = ({ sale }) => {
  if (!sale) {
    return <div className="p-6 text-red-600">Sale data not available!</div>;
  }
  const filteredKeys = Object.keys(sale).filter(
    (key) => key !== "items" && key !== "saleid"
  );
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sale Details - #{sale.saleid}</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {filteredKeys.map((key) => (
              <th
                key={key}
                className="px-4 py-2 border border-gray-300 text-left"
              >
                {key.replace(/_/g, " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {filteredKeys.map((key, index) => (
              <td key={index} className="px-4 py-2 border border-gray-300">
                {sale[key] && typeof sale[key] === "object"
                  ? JSON.stringify(sale[key])
                  : sale[key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

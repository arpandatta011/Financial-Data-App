import React from "react";

const DataTable = ({ data, sortConfig, onSort }) => {
  const formatCurrency = (value) => {
    return `$${(value / 1000000000).toFixed(2)}B`;
  };

  const getSortIcon = (field) => {
    if (sortConfig.field === field) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              {[
                "Date",
                "Revenue",
                "Net Income",
                "Gross Profit",
                "EPS",
                "Operating Income",
              ].map((header, index) => (
                <th
                  key={header}
                  onClick={() => onSort(header.toLowerCase().replace(" ", ""))}
                  className={`
                    px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider
                    ${
                      index < 3
                        ? "cursor-pointer hover:bg-blue-700 transition-colors duration-150"
                        : ""
                    }
                  `}
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {index < 3 && (
                      <span className="text-gray-200">
                        {getSortIcon(header.toLowerCase().replace(" ", ""))}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, idx) => (
              <tr
                key={item.date}
                className={`
                  transition-colors duration-150
                  ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-blue-50
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(item.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(item.netIncome)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(item.grossProfit)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ${item.eps.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatCurrency(item.operatingIncome)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

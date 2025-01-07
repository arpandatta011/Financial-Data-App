import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleRangeChange = (field, value, type) => {
    onFilterChange({
      ...filters,
      [field]: {
        ...filters[field],
        [type]: value ? Number(value) : null,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <DatePicker
            selectsRange
            startDate={filters.dateRange.start}
            endDate={filters.dateRange.end}
            onChange={(dates) => {
              const [start, end] = dates;
              onFilterChange({
                ...filters,
                dateRange: { start, end },
              });
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholderText="Select date range"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Revenue Range (Billions)
          </label>
          <div className="flex space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={
                filters.revenue.min ? filters.revenue.min / 1000000000 : ""
              }
              onChange={(e) =>
                handleRangeChange("revenue", e.target.value * 1000000000, "min")
              }
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={
                filters.revenue.max ? filters.revenue.max / 1000000000 : ""
              }
              onChange={(e) =>
                handleRangeChange("revenue", e.target.value * 1000000000, "max")
              }
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Net Income Range (Billions)
          </label>
          <div className="flex space-x-3">
            <input
              type="number"
              placeholder="Min"
              value={
                filters.netIncome.min ? filters.netIncome.min / 1000000000 : ""
              }
              onChange={(e) =>
                handleRangeChange(
                  "netIncome",
                  e.target.value * 1000000000,
                  "min"
                )
              }
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={
                filters.netIncome.max ? filters.netIncome.max / 1000000000 : ""
              }
              onChange={(e) =>
                handleRangeChange(
                  "netIncome",
                  e.target.value * 1000000000,
                  "max"
                )
              }
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

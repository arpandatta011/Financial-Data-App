import { useState, useEffect } from "react";
import { fetchIncomeStatements } from "./services/api";
import DataTable from "./components/DataTable";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    revenue: { min: null, max: null },
    netIncome: { min: null, max: null },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const statements = await fetchIncomeStatements();
        setData(statements);
        setFilteredData(statements);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...data];

    if (filters.dateRange.start && filters.dateRange.end) {
      result = result.filter((item) => {
        const date = new Date(item.date);
        return date >= filters.dateRange.start && date <= filters.dateRange.end;
      });
    }

    if (filters.revenue.min !== null) {
      result = result.filter((item) => item.revenue >= filters.revenue.min);
    }
    if (filters.revenue.max !== null) {
      result = result.filter((item) => item.revenue <= filters.revenue.max);
    }

    if (filters.netIncome.min !== null) {
      result = result.filter((item) => item.netIncome >= filters.netIncome.min);
    }
    if (filters.netIncome.max !== null) {
      result = result.filter((item) => item.netIncome <= filters.netIncome.max);
    }

    result.sort((a, b) => {
      if (sortConfig.field === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredData(result);
  }, [data, filters, sortConfig]);

  const handleSort = (field) => {
    setSortConfig((prevConfig) => ({
      field,
      direction:
        prevConfig.field === field && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Apple Inc. Financial Data
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Analyze Apple's financial performance with interactive filters and
            sorting capabilities.
          </p>
        </div>

        <FilterPanel filters={filters} onFilterChange={setFilters} />

        <DataTable
          data={filteredData}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}

export default App;

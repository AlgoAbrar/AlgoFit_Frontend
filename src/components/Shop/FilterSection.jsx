import { useState } from "react";
import {
  FiFilter,
  FiSearch,
  FiX,
  FiSliders,
  FiDollarSign,
  FiTag,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
} from "react-icons/fi";

const FilterSection = ({
  priceRange,
  handlePriceChange,
  memberships,
  selectedMembership,
  handleMembershipChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
  onResetFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceInputChange = (index, value) => {
    // Ensure values stay within bounds
    if (index === 0) {
      value = Math.max(0, Math.min(value, priceRange[1] - 10));
    } else {
      value = Math.min(1000, Math.max(value, priceRange[0] + 10));
    }
    handlePriceChange(index, value);
  };

  return (
    <div className="mb-8">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white p-4 rounded-lg shadow mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-800"
        >
          <span className="flex items-center gap-2">
            <FiSliders className="w-5 h-5" />
            Filters & Sorting
          </span>
          <span
            className={`transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <FiArrowDown className="w-5 h-5" />
          </span>
        </button>
      </div>

      <div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Price Range */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <FiDollarSign className="w-4 h-4" />
                Price Range
              </label>
              <div className="text-xs text-primary font-medium">
                ${priceRange[0]} - ${priceRange[1]}
              </div>
            </div>

            <div className="space-y-4">
              {/* Min Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Min</span>
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1] - 10}
                    value={priceRange[0]}
                    onChange={(e) =>
                      handlePriceInputChange(0, Number(e.target.value))
                    }
                    className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={priceRange[1] - 10}
                  step="5"
                  value={priceRange[0]}
                  onChange={(e) =>
                    handlePriceInputChange(0, Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Max Range */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Max</span>
                  <input
                    type="number"
                    min={priceRange[0] + 10}
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      handlePriceInputChange(1, Number(e.target.value))
                    }
                    className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="range"
                  min={priceRange[0] + 10}
                  max="1000"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) =>
                    handlePriceInputChange(1, Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>

          {/* Membership Filter */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
              <FiTag className="w-4 h-4" />
              Membership
            </label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                value={selectedMembership}
                onChange={(e) => handleMembershipChange(e.target.value)}
              >
                <option value="">All Memberships</option>
                {memberships.map((membership) => (
                  <option key={membership.id} value={membership.id}>
                    {membership.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FiArrowDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
              <FiSearch className="w-4 h-4" />
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchQuery(e.target.value)}
                placeholder="Search plans..."
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sorting */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
              <FiFilter className="w-4 h-4" />
              Sort By
            </label>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                value={sortOrder}
                onChange={(e) => handleSorting(e.target.value)}
              >
                <option value="">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FiArrowDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-2 px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <FiRefreshCw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      </div>

      {/* Active Filters Badges (Desktop) */}
      <div className="hidden lg:flex items-center gap-3 mt-4 flex-wrap">
        {(priceRange[0] > 0 || priceRange[1] < 1000) && (
          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            Price: ${priceRange[0]} - ${priceRange[1]}
            <button
              onClick={() => handlePriceChange(0, 0)}
              className="hover:text-blue-900"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {selectedMembership && (
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            Membership:{" "}
            {memberships.find((c) => c.id === selectedMembership)?.name}
            <button
              onClick={() => handleMembershipChange("")}
              className="hover:text-green-900"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {searchQuery && (
          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            Search: {searchQuery}
            <button
              onClick={() => handleSearchQuery("")}
              className="hover:text-purple-900"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
        {sortOrder && (
          <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
            Sort:{" "}
            {sortOrder === "price"
              ? "Low to High"
              : sortOrder === "-price"
              ? "High to Low"
              : sortOrder}
            <button
              onClick={() => handleSorting("")}
              className="hover:text-orange-900"
            >
              <FiX className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterSection;

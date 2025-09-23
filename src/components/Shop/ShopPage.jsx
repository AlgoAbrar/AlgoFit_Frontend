import { useState } from "react";
import PlanList from "./PlanList";
import Pagination from "./Pagination";
import useFetchPlan from "../../hooks/useFetchPlans";
import FilterSection from "./FilterSection";
import useFetchMemberships from "../../hooks/useFetchMemberships";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedMembership, setSelecetedMembership] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { plans, loading, totalPages } = useFetchPlan(
    currentPage,
    priceRange,
    selectedMembership,
    searchQuery,
    sortOrder
  );

  const memberships = useFetchMemberships();

  const handlePriceChange = (index, value) => {
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Our Plans</h1>
      <FilterSection
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        memberships={memberships}
        selectedMembership={selectedMembership}
        handleMembershipChange={setSelecetedMembership}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        handleSorting={setSortOrder}
      />
      <PlanList plans={plans} loading={loading} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />
    </div>
  );
};

export default ShopPage;

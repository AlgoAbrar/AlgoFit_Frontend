import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchPlan = (
  currentPage,
  priceRange,
  selectedMembership,
  searchQuery,
  sortOrder
) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      const url = `/plans/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&membership_id=${selectedMembership}&search=${searchQuery}&ordering=${sortOrder}`;
      try {
        const response = await apiClient.get(url);
        const data = await response.data;

        setPlans(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [currentPage, priceRange, selectedMembership, searchQuery, sortOrder]);

  return { plans, loading, totalPages };
};

export default useFetchPlan;

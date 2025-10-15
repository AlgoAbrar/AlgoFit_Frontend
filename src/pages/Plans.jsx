import { useState, useEffect } from "react";
import { Link } from "react-router";
import apiClient from "../services/api-client";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/plans/");
      setPlans(response.data.results || response.data);
    } catch (err) {
      setError("Failed to load plans. Please try again.");
      console.error("Fetch plans error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (planId, planName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${planName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await apiClient.delete(`/plans/${planId}/`);
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
      setSuccess(`Plan "${planName}" deleted successfully!`);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete plan. Please try again.");
      console.error("Delete plan error:", err);
    }
  };

  // Filter plans based on search and category
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !filterCategory || plan.category?.name === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [
    ...new Set(plans.map((plan) => plan.category?.name).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Plans</h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your fitness plans
            </p>
          </div>
          <Link
            to="/dashboard/plans/add"
            className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Create New Plan
          </Link>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6">
            <ErrorAlert error={error} onDismiss={() => setError("")} />
          </div>
        )}

        {success && (
          <div className="mb-6">
            <SuccessAlert message={success} onDismiss={() => setSuccess("")} />
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-end text-gray-600">
              Showing {filteredPlans.length} of {plans.length} plans
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No plans found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterCategory
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first fitness plan"}
            </p>
            <Link
              to="/plans/create"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Create New Plan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Plan Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={plan.images?.[0]?.image || "/default-plan.jpg"}
                    alt={plan.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Plan Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  {plan.category && (
                    <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-3">
                      {plan.category.name}
                    </span>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {plan.description}
                  </p>

                  {/* Price and Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${plan.price}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        plan.slot > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {plan.slot > 0 ? `${plan.slot} slots` : "Sold Out"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/plans/${plan.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEye className="w-4 h-4" />
                      View
                    </Link>

                    <Link
                      to={`/plans/${plan.id}/edit`}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiEdit className="w-4 h-4" />
                      Edit
                    </Link>

                    <button
                      onClick={() => deletePlan(plan.id, plan.name)}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plans;

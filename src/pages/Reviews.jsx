import { useState, useEffect } from "react";
import { Link } from "react-router";
import apiClient from "../services/api-client";
import {
  FiStar,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiUser,
  FiMessageSquare,
  FiThumbsUp,
  FiAlertCircle,
} from "react-icons/fi";
import ErrorAlert from "../components/ErrorAlert";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch reviews and plans simultaneously
      const [reviewsResponse, plansResponse] = await Promise.all([
        apiClient.get("/reviews/"),
        apiClient.get("/plans/"),
      ]);

      setReviews(reviewsResponse.data.results || reviewsResponse.data);
      setPlans(plansResponse.data.results || plansResponse.data);
    } catch (err) {
      setError("Failed to load reviews. Please try again.");
      console.error("Fetch reviews error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter reviews based on selected filters
  const filteredReviews = reviews.filter((review) => {
    const matchesPlan =
      !selectedPlan || review.plan?.id === parseInt(selectedPlan);
    const matchesRating =
      !ratingFilter || review.rating === parseInt(ratingFilter);
    const matchesSearch =
      !searchTerm ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesPlan && matchesRating && matchesSearch;
  });

  // Calculate average ratings for each plan
  const planStats = plans.map((plan) => {
    const planReviews = reviews.filter((review) => review.plan?.id === plan.id);
    const averageRating =
      planReviews.length > 0
        ? planReviews.reduce((sum, review) => sum + review.rating, 0) /
          planReviews.length
        : 0;

    return {
      ...plan,
      reviewCount: planReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
    };
  });

  // Render star rating
  const renderStars = (rating, size = "sm") => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${
              star <= rating ? "text-amber-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span
          className={`ml-1 font-medium ${
            size === "sm" ? "text-sm" : "text-base"
          } text-gray-700`}
        >
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="lg:col-span-3 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Customer Reviews
          </h1>
          <p className="text-gray-600">
            Read what our members are saying about their fitness journey
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorAlert error={error} onDismiss={() => setError("")} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters and Plan Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiSearch className="w-4 h-4" />
                Search Reviews
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Plan Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiFilter className="w-4 h-4" />
                Filter by Plan
              </h3>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
              >
                <option value="">All Plans</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Filter by Rating
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setRatingFilter(ratingFilter === rating ? "" : rating)
                    }
                    className={`w-full text-left p-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                      ratingFilter === rating
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FiStar
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rating
                              ? "text-amber-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Plan Ratings</h3>
              <div className="space-y-3">
                {planStats
                  .filter((plan) => plan.reviewCount > 0)
                  .sort((a, b) => b.averageRating - a.averageRating)
                  .slice(0, 5)
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {plan.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(plan.averageRating, "sm")}
                          <span className="text-xs text-gray-500">
                            ({plan.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {filteredReviews.length} Review
                    {filteredReviews.length !== 1 ? "s" : ""} Found
                  </h2>
                  {(selectedPlan || ratingFilter || searchTerm) && (
                    <p className="text-sm text-gray-600 mt-1">
                      Filtered by:
                      {selectedPlan &&
                        ` Plan: ${
                          plans.find((p) => p.id === parseInt(selectedPlan))
                            ?.name
                        }`}
                      {ratingFilter && ` Rating: ${ratingFilter} stars`}
                      {searchTerm && ` Search: "${searchTerm}"`}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedPlan("");
                    setRatingFilter("");
                    setSearchTerm("");
                  }}
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Reviews List */}
            {filteredReviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <FiAlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedPlan || ratingFilter || searchTerm
                    ? "Try adjusting your filters to see more results"
                    : "No reviews have been submitted yet"}
                </p>
                <Link
                  to="/plans"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Browse Plans
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {review.user?.name || "Anonymous User"}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FiCalendar className="w-4 h-4" />
                            {formatDate(review.created_at)}
                          </div>
                        </div>
                      </div>
                      {renderStars(review.rating, "md")}
                    </div>

                    {/* Plan Info */}
                    <div className="mb-4">
                      <Link
                        to={`/plans/${review.plan?.id}`}
                        className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                      >
                        <FiUser className="w-4 h-4" />
                        {review.plan?.name}
                      </Link>
                    </div>

                    {/* Review Comment */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>

                    {/* Review Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {review.helpful_count > 0 && (
                          <span className="flex items-center gap-1">
                            <FiThumbsUp className="w-4 h-4" />
                            {review.helpful_count} helpful
                          </span>
                        )}
                      </div>
                      <button className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1">
                        <FiMessageSquare className="w-4 h-4" />
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

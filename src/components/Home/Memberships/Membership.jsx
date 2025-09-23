import { useEffect, useState } from "react";
import apiClient from "../../../services/api-client";
import MembershipItems from "./MembershipItems";
import { FaArrowRight } from "react-icons/fa";

const Membership = () => {
  const [memberships, setMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get("/memberships");
        setMemberships(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch memberships:", err);
        setError("Failed to load memberships. Please try again later.");
        // Set fallback data for demo purposes
        setMemberships([
          { id: 1, name: "Strength Training", class_count: 12, image: "" },
          { id: 2, name: "Cardio", class_count: 8, image: "" },
          { id: 3, name: "Yoga", class_count: 15, image: "" },
          { id: 4, name: "CrossFit", class_count: 6, image: "" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Membership Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Browse Memberships
          </h2>
          <p className="text-gray-600 max-w-lg">
            Explore our diverse range of fitness memberships to find the perfect
            workout for your goals
          </p>
        </div>
        <a
          href="shop"
          className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:gap-3"
        >
          View All
          <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Membership Grid */}
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memberships.map((membership, index) => (
            <MembershipItems
              key={membership.id}
              index={index}
              membership={membership}
            />
          ))}
        </div>
      )}

      {/* Mobile view all button */}
      <div className="mt-8 flex justify-center md:hidden">
        <a
          href="/shop"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-md w-full max-w-xs"
        >
          View All Memberships
          <FaArrowRight />
        </a>
      </div>
    </section>
  );
};

export default Membership;

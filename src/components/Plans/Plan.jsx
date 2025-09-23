import { useEffect, useState } from "react";
import PlanItem from "./PlanItem";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/plans/")
      .then((res) => setPlans(res.data.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 md:px-8 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Trending Plans</h2>
          <a
            href="/shop"
            className="btn btn-secondary px-6 py-6 rounded-full text-lg"
          >
            View All
          </a>
        </div>
        {/* Spinner  */}
        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-secondary"></span>
          </div>
        )}

        {error && <ErrorAlert error={error} />}
        {/* Plan Slider  */}
        {!isLoading && !error && plans.length > 0 && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            className="mt-4 px-4 container"
          >
            {plans.map((plan) => (
              <SwiperSlide key={plan.id} className="flex justify-center">
                <PlanItem key={plan.id} plan={plan} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!isLoading && !error && plans.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No Plans Available</p>
        )}
      </div>
    </section>
  );
};

export default Plan;

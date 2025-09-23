import { Link, useParams } from "react-router";
import AddToCartButton from "../components/PlanDetails/AddToCartButton";
import PlanImageGallery from "../components/PlanDetails/PlanImageGallery";
import { FaArrowLeft } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import ReviewSection from "../components/Reviews/ReviewSection";

const PlanDetail = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { planId } = useParams();

  useEffect(() => {
    setLoading(true);
    apiClient.get(`/plans/${planId}/`).then((res) => {
      setPlan(res.data);
      console.log(res.data);
      setLoading(false);
    });
  }, [planId]);

  if (loading) return <div>Loading...</div>;
  if (!plan) return <div>Plan Not Found...</div>;

  return (
    <div className="w-3/4 mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/shop"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to plans
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg"></div>
          }
        >
          <PlanImageGallery images={plan?.images} planName={plan.name} />
        </Suspense>
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="badge badge-outline mb-2">
              Membership {plan.membership}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{plan.name}</h1>
          </div>

          <div className="mt-2 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-sm text-base-content/70">
                (${plan.price_with_tax} incl. tax)
              </span>
            </div>
          </div>

          <div className="prose prose-sm mb-6">
            <p>{plan.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Availability:</div>
              {plan.slot > 0 ? (
                <div className="badge badge-outline bg-success/10 text-success border-success/20">
                  In slot ({plan.slot} available)
                </div>
              ) : (
                <div className="badge badge-outline bg-error/10 text-error border-error/20">
                  Out of slot
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <AddToCartButton plan={plan} />
          </div>
        </div>
      </div>
      <ReviewSection />
    </div>
  );
};

export default PlanDetail;

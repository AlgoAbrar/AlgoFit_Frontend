import { useState, useEffect } from "react";
import bgImg from "../../../assets/images/banner-image-bg-1.jpg";
import bannerImg from "../../../assets/images/banner-image3.png";
import DiscountTimer from "./DiscountTimer";

const DiscountSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImg})`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/10 to-accent/10 z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
        {/* Left Content - Image */}
        <div
          className={`w-full lg:w-2/5 flex justify-center transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          <div className="relative">
            <img
              className="w-full max-w-md transform hover:scale-105 transition-transform duration-700"
              src={bannerImg}
              alt="Special discount offer"
            />
            {/* Floating discount badge */}
            <div className="absolute -top-4 -left-4 bg-red-500 text-white text-lg font-bold px-6 py-3 rounded-full shadow-lg rotate-[-15deg] animate-bounce-slow">
              30% OFF
            </div>
          </div>
        </div>

        {/* Right Content - Text and CTA */}
        <div
          className={`w-full lg:w-3/5 text-center lg:text-left transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              30% Discount
            </span>
            <br />
            On All Items. Hurry Up!
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0">
            Limited time offer! Don't miss your chance to get premium fitness
            items at an incredible price. This special promotion ends soon.
          </p>

          {/* CountDown Timer */}
          <div className="mb-10">
            <DiscountTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                <a href="shop">Shop Collection</a>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              <a href="about">Learn More</a>
            </button>
          </div>

          {/* Additional info */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-gray-300">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Free shipping on orders over $100
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              30-day money back guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;

import bgImg from "../../../assets/images/banner-image-bg-2.jpg";
import { useState, useEffect } from "react";

const CarouselSlide = ({ title, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImg})`,
      }}
    >
      {/* Background overlay and animation elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-0"></div>

      {/* Animated elements in background */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left Content */}
        <div
          className={`w-full md:w-1/2 text-center md:text-left transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {title.split(" ")[0]}
            </span>{" "}
            {title.split(" ").slice(1).join(" ")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="btn btn-primary px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
              <span className="group-hover:scale-110 transition-transform duration-300">
                Explore Plans
              </span>
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
            </button>
            <button className="btn btn-outline border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              <a href="about">Learn More</a>
            </button>
          </div>

          {/* Stats section */}
          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-gray-300">Happy Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-gray-300">Expert Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-gray-300">Open Access</div>
            </div>
          </div>
        </div>

        {/* Right Content - Placeholder for image or additional content */}
        <div
          className={`w-full md:w-2/5 mt-12 md:mt-0 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative">
            <div className="aspect-square bg-primary/20 rounded-full flex items-center justify-center p-8 border-2 border-primary/30">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center p-12">
                <svg
                  className="w-24 h-24 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
              <span className="text-black font-bold">🔥</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-slow animation-delay-1000">
              <span className="text-primary font-bold">💪</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-black"
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

export default CarouselSlide;

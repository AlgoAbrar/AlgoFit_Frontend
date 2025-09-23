import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselSlide from "./CarouselSlide";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Custom CSS for Swiper
import "./HeroCarousel.css";

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    {
      title: "Transform Your Body",
      subtitle: "Get up to 30% off on annual memberships. Limited time offer!",
    },
    {
      title: "Expert Training Programs",
      subtitle: "Specialized trainers for every fitness goal and level!",
    },
    {
      title: "Your Fitness Journey Starts Here",
      subtitle: "Discover personalized workouts for your unique fitness needs.",
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: function (index, className) {
            return `<span class="${className}">
                      <span class="progress-bar"></span>
                    </span>`;
          },
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
        onSlideChange={handleSlideChange}
        loop={true}
        speed={800}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide title={slide.title} subtitle={slide.subtitle} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center space-x-2">
        <button className="custom-prev hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-black hover:bg-white/30 transition-all duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="custom-pagination flex items-center space-x-2"></div>

        <button className="custom-next hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-black hover:bg-white/30 transition-all duration-300">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Slide indicators with titles */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 hidden lg:flex items-center space-x-8">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "bg-primary text-blackk"
                : "bg-white/10 text-white/70 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            {slide.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Autoplay progress indicator */}
      <div className="absolute top-4 right-4 z-10 hidden md:flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <span className="text-xs text-white">Live</span>
      </div>
    </div>
  );
};

export default HeroCarousel;

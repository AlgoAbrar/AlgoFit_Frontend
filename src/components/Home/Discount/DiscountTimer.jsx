import { useEffect, useState } from "react";

const DiscountTimer = () => {
  const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 25; // set 25 days countdown

  const getTimeRemaining = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Format numbers to always show two digits
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div
      className={`my-8 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <p className="text-lg text-gray-300 mb-4 text-center lg:text-left">
        This offer ends in:
      </p>

      <div className="flex justify-center lg:justify-start space-x-2 md:space-x-4">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatNumber(timeLeft.days)}
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine"></div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br"></div>
          </div>
          <span className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
            Days
          </span>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center h-20 text-2xl text-primary font-bold">
          :
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatNumber(timeLeft.hours)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine animation-delay-1000"></div>
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br"></div>
          </div>
          <span className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
            Hours
          </span>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center h-20 text-2xl text-primary font-bold">
          :
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatNumber(timeLeft.minutes)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine animation-delay-2000"></div>
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br"></div>
          </div>
          <span className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
            Minutes
          </span>
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center h-20 text-2xl text-primary font-bold">
          :
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg flex items-center justify-center shadow-lg relative overflow-hidden">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatNumber(timeLeft.seconds)}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine animation-delay-3000"></div>
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br"></div>
          </div>
          <span className="text-xs text-gray-300 mt-2 uppercase tracking-wider">
            Seconds
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full bg-gray-700 rounded-full h-2.5 max-w-md mx-auto lg:mx-0">
        <div
          className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full transition-all duration-1000"
          style={{
            width: `${
              100 - (timeLeft.total / (1000 * 60 * 60 * 24 * 25)) * 100
            }%`,
          }}
        ></div>
      </div>

      {/* Urgency message */}
      <p className="text-sm text-red-400 mt-4 text-center lg:text-left animate-pulse">
        ⚡ Limited time offer! Prices go up when the timer hits zero.
      </p>
    </div>
  );
};

export default DiscountTimer;

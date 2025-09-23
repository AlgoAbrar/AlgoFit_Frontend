import { useState, useEffect } from "react";
import { FaShoppingCart, FaTruck, FaUndo } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaTags } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FaTruck className="text-4xl" />,
      title: "Free Delivery",
      description:
        "Get your orders delivered at no extra cost, fast and hassle-free.",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      icon: <MdVerified className="text-4xl" />,
      title: "Quality Guarantee",
      description: "We ensure top-notch quality for every plan you purchase.",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
    {
      icon: <FaTags className="text-4xl" />,
      title: "Daily Offers",
      description: "Exclusive discounts and special deals available every day.",
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100",
    },
    {
      icon: <BsShieldLock className="text-4xl" />,
      title: "100% Secure Payment",
      description:
        "Your payment information is encrypted and completely secure.",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
    {
      icon: <FaUndo className="text-4xl" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy on all items.",
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100",
    },
    {
      icon: <FaShoppingCart className="text-4xl" />,
      title: "24/7 Support",
      description: "Our customer service team is always ready to help you.",
      gradient: "from-indigo-500 to-indigo-600",
      bgGradient: "from-indigo-50 to-indigo-100",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best shopping experience with
            premium services that put your needs first.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group h-full bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 p-6 text-center transition-all duration-300 hover:-translate-y-2 flex flex-col items-center">
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.bgGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3
                  className={`text-lg font-semibold mb-3 bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm flex-grow">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div
                  className={`w-0 group-hover:w-12 h-0.5 bg-gradient-to-r ${feature.gradient} mt-4 transition-all duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              10K+
            </div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              500+
            </div>
            <div className="text-gray-600">Plans</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              95%
            </div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              24/7
            </div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

import { useState } from "react";
import {
  FaAngleRight,
  FaDumbbell,
  FaHeart,
  FaRunning,
  FaFire,
} from "react-icons/fa";

const MembershipItems = ({ index, membership }) => {
  const [isHovered, setIsHovered] = useState(false);

  const gradients = [
    "from-blue-100 to-indigo-100",
    "from-green-100 to-emerald-100",
    "from-amber-100 to-orange-100",
    "from-purple-100 to-pink-100",
  ];

  const accentColors = [
    "text-blue-600",
    "text-green-600",
    "text-amber-600",
    "text-purple-600",
  ];

  const hoverColors = [
    "hover:text-blue-700",
    "hover:text-green-700",
    "hover:text-amber-700",
    "hover:text-purple-700",
  ];

  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-purple-500",
  ];

  const membershipIcons = [
    <FaDumbbell className="h-5 w-5" />,
    <FaHeart className="h-5 w-5" />,
    <FaRunning className="h-5 w-5" />,
    <FaFire className="h-5 w-5" />,
  ];

  const gradientIndex = index % gradients.length;

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br ${gradients[gradientIndex]} transform hover:-translate-y-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex flex-col h-full relative">
        {/* Decorative element */}
        <div
          className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${bgColors[gradientIndex]} opacity-10`}
        ></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <div
            className={`h-12 w-12 rounded-full ${bgColors[gradientIndex]} text-white flex items-center justify-center font-bold text-lg shadow-md`}
          >
            {membershipIcons[gradientIndex]}
          </div>
          <span
            className={`text-xs font-semibold ${accentColors[gradientIndex]} bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm`}
          >
            {membership.plan_count || membership.class_count || 0}{" "}
            {membership.plan_count === 1 ? "Plan" : "Plans"}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-800 relative z-10">
          {membership.name}
        </h3>

        <p className="text-gray-600 text-sm mb-6 flex-grow relative z-10">
          {membership.description ||
            "Explore our specialized training programs designed for maximum results."}
        </p>

        <button
          className={`font-semibold transition-all flex items-center group relative z-10 ${accentColors[gradientIndex]} ${hoverColors[gradientIndex]}`}
        >
          <span className="mr-2">Explore Plans</span>
          <FaAngleRight
            className={`transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
              isHovered ? "w-full" : "w-0"
            }`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default MembershipItems;

import { useState, useEffect } from "react";
import {
  FiX,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiRefreshCw,
} from "react-icons/fi";

const ErrorAlert = ({
  error,
  onDismiss,
  dismissible = true,
  variant = "error",
  autoDismiss = false,
  autoDismissTimeout = 5000,
  action,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (autoDismiss && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismissTimeout);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissTimeout, isVisible]);

  const handleDismiss = () => {
    if (dismissible) {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, 300);
    }
  };

  if (!isVisible) return null;

  const variants = {
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
      iconBg: "bg-red-100",
      border: "border-red-200",
    },
    warning: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      icon: <FiAlertTriangle className="w-5 h-5 text-amber-500" />,
      iconBg: "bg-amber-100",
      border: "border-amber-200",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: <FiInfo className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-100",
      border: "border-blue-200",
    },
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: <FiAlertCircle className="w-5 h-5 text-green-500" />,
      iconBg: "bg-green-100",
      border: "border-green-200",
    },
  };

  const currentVariant = variants[variant] || variants.error;

  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-300 transform
        ${currentVariant.bg} ${currentVariant.border} ${currentVariant.text}
        ${
          isExiting
            ? "opacity-0 scale-95 -translate-y-2"
            : "opacity-100 scale-100 translate-y-0"
        }
        ${className}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 p-2 rounded-full ${currentVariant.iconBg}`}
        >
          {currentVariant.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{error}</div>

          {/* Action Button */}
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${
                    variant === "error"
                      ? "bg-red-100 hover:bg-red-200 text-red-800"
                      : ""
                  }
                  ${
                    variant === "warning"
                      ? "bg-amber-100 hover:bg-amber-200 text-amber-800"
                      : ""
                  }
                  ${
                    variant === "info"
                      ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      : ""
                  }
                  ${
                    variant === "success"
                      ? "bg-green-100 hover:bg-green-200 text-green-800"
                      : ""
                  }
                `}
              >
                {action.icon &&
                  React.cloneElement(action.icon, { className: "w-4 h-4" })}
                {action.label}
              </button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`
              flex-shrink-0 p-1 rounded-md transition-colors hover:bg-opacity-20
              ${variant === "error" ? "hover:bg-red-200" : ""}
              ${variant === "warning" ? "hover:bg-amber-200" : ""}
              ${variant === "info" ? "hover:bg-blue-200" : ""}
              ${variant === "success" ? "hover:bg-green-200" : ""}
            `}
            aria-label="Dismiss alert"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar for auto-dismiss */}
      {autoDismiss && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-current bg-opacity-20">
          <div
            className={`h-full ${currentVariant.bg
              .replace("bg-", "bg-")
              .replace("-50", "-300")} transition-all duration-500`}
            style={{
              width: isExiting ? "0%" : "100%",
              transition: isExiting
                ? "width 0.3s ease"
                : `width ${autoDismissTimeout}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ErrorAlert;

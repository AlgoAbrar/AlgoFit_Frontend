import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorAlert from "../ErrorAlert";
import apiClient from "../../services/api-client";
import {
  FiCheckCircle,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiUserCheck,
} from "react-icons/fi";

const ActivateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.post("/auth/users/activation/", {
          uid,
          token,
        });

        if (response.status === 204) {
          setMessage("Account activated successfully!");

          // Start countdown for redirect
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate("/login", {
                  state: {
                    message: "Account activated successfully! Please login.",
                  },
                  replace: true,
                });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error("Activation error:", error);
        setError(
          error.response?.data?.detail ||
            "Invalid or expired activation link. Please request a new activation email."
        );
      } finally {
        setIsLoading(false);
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  const handleResendActivation = () => {
    // Implement resend activation logic here
    console.log("Resend activation email");
    // This would typically call an API endpoint to resend activation email
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
              <FiUserCheck className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Account Activation
          </h1>
          <p className="text-gray-600">Completing your registration process</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-600">Activating your account...</p>
            </div>
          ) : message ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Success!
              </h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700">
                  Redirecting to login in {countdown} second
                  {countdown !== 1 ? "s" : ""}...
                </p>
              </div>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to Login
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Activation Failed
              </h3>
              <ErrorAlert error={error} />

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleResendActivation}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FiMail className="w-5 h-5" />
                  Resend Activation Email
                </button>
                <button
                  onClick={handleGoToLogin}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-300"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Support Information */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <FiMail className="w-4 h-4" />
              Email
            </a>
            <a
              href="tel:+1234567890"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <FiPhone className="w-4 h-4" />
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;

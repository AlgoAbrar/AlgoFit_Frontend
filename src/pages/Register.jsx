import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiHome,
  FiPhone,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Register = () => {
  const { registerUser, errorMsg, clearError } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    // Clear errors when component unmounts
    return () => {
      clearErrors();
    };
  }, [clearErrors]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: { message: "Registration successful! Please login." },
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    clearErrors();
    setSuccessMsg("");

    try {
      delete data.confirm_password;
      const response = await registerUser(data);

      if (response.success) {
        setSuccessMsg(
          response.message || "Registration successful! Redirecting to login..."
        );
      }
    } catch (error) {
      console.error("Registration failed", error);
      // Handle specific error cases
      if (error.response?.data?.email) {
        setError("email", {
          type: "manual",
          message: error.response.data.email[0],
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", meets: password?.length >= 8 },
    { id: 2, text: "Contains a number", meets: /\d/.test(password) },
    { id: 3, text: "Contains uppercase letter", meets: /[A-Z]/.test(password) },
    { id: 4, text: "Contains lowercase letter", meets: /[a-z]/.test(password) },
    {
      id: 5,
      text: "Contains special character",
      meets: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiUser className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join thousands of fitness enthusiasts</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Alerts */}
            {errorMsg && (
              <div className="mb-6">
                <ErrorAlert error={errorMsg} onDismiss={clearError} />
              </div>
            )}

            {successMsg && (
              <div className="mb-6">
                <SuccessAlert message={successMsg} />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="first_name" className="form-label">
                    First Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="first_name"
                      type="text"
                      placeholder="John"
                      className="form-input pl-10"
                      {...register("first_name", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.first_name && (
                    <span className="form-error">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="last_name" className="form-label">
                    Last Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="last_name"
                      type="text"
                      placeholder="Doe"
                      className="form-input pl-10"
                      {...register("last_name", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.last_name && (
                    <span className="form-error">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="form-input pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="address"
                    type="text"
                    placeholder="7/A Dhanmondi, Dhaka"
                    className="form-input pl-10"
                    {...register("address")}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="phone_number"
                    type="tel"
                    placeholder="0123456789"
                    className="form-input pl-10"
                    {...register("phone_number", {
                      pattern: {
                        value: /^[0-9+\-\s()]{10,}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phone_number && (
                  <span className="form-error">
                    {errors.phone_number.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="form-input pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}

                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Password must contain:
                    </p>
                    <div className="space-y-1">
                      {passwordRequirements.map((req) => (
                        <div key={req.id} className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                              req.meets
                                ? "bg-green-500 text-white"
                                : "bg-gray-300"
                            }`}
                          >
                            {req.meets && <FiCheck className="w-3 h-3" />}
                          </div>
                          <span
                            className={`text-sm ${
                              req.meets ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password *
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="form-input pl-10 pr-10"
                    {...register("confirm_password", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirm_password && (
                  <span className="form-error">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-dark text-black py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Terms and Privacy */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-black hover:text-primary-dark">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-black hover:text-primary-dark">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black hover:text-primary-dark font-semibold transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

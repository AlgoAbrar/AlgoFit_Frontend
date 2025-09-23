import { useForm } from "react-hook-form";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import { useEffect, useState } from "react";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import { FiUser, FiLock, FiEdit2, FiCheckCircle } from "react-icons/fi";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, updateUserProfile, changePassword, errorMsg, clearError } =
    useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  useEffect(() => {
    // Clear success message after 5 seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    // Clear error when component unmounts or editing state changes
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data) => {
    try {
      clearError();
      setSuccessMessage("");

      // Profile update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      await updateUserProfile(profilePayload);

      // Password Change (only if fields are filled)
      if (data.current_password && data.new_password) {
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }

      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);

      // Reset form to clear password fields
      reset({
        ...user,
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
    clearError();
    setSuccessMessage("");
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile Info",
      icon: <FiUser className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <FiLock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your account information and security settings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 md:p-8">
            {/* Alerts */}
            {errorMsg && (
              <div className="mb-6">
                <ErrorAlert error={errorMsg} onDismiss={clearError} />
              </div>
            )}

            {successMessage && (
              <div className="mb-6">
                <SuccessAlert
                  message={successMessage}
                  onDismiss={() => setSuccessMessage("")}
                />
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Information */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h2>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <ProfileForm
                    register={register}
                    errors={errors}
                    isEditing={isEditing}
                  />

                  {isEditing && (
                    <ProfileButtons
                      isEditing={isEditing}
                      onCancel={handleCancel}
                      isSubmitting={isSubmitting}
                      isDirty={isDirty}
                    />
                  )}
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Security Settings
                    </h2>
                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        <FiEdit2 className="w-4 h-4" />
                        Change Password
                      </button>
                    )}
                  </div>

                  <PasswordChangeForm
                    errors={errors}
                    register={register}
                    isEditing={isEditing}
                    watch={watch}
                  />

                  {isEditing && (
                    <ProfileButtons
                      isEditing={isEditing}
                      onCancel={handleCancel}
                      isSubmitting={isSubmitting}
                      isDirty={isDirty}
                    />
                  )}

                  {/* Security Tips */}
                  {!isEditing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4" />
                        Security Tips
                      </h3>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Use a strong, unique password</li>
                        <li>• Enable two-factor authentication if available</li>
                        <li>• Regularly update your password</li>
                        <li>• Never share your password with anyone</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </form>

            {/* Read-only Stats */}
            {!isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Member since:</span>
                    <p className="text-gray-800 font-medium">
                      {user?.date_joined
                        ? new Date(user.date_joined).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email verified:</span>
                    <p className="text-gray-800 font-medium">
                      {user?.email_verified ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last login:</span>
                    <p className="text-gray-800 font-medium">
                      {user?.last_login
                        ? new Date(user.last_login).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Account status:</span>
                    <p className="text-green-600 font-medium">Active</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Security Options */}
        {!isEditing && activeTab === "security" && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Additional Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                  Enable 2FA
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">Active Sessions</h4>
                  <p className="text-gray-600 text-sm">
                    Manage your active login sessions
                  </p>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                  View Sessions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

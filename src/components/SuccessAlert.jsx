import { FiCheckCircle, FiX } from "react-icons/fi";

const SuccessAlert = ({ message, onDismiss }) => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-green-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SuccessAlert;

// src/components/UpdateNotification.jsx
"use client";

export default function UpdateNotification({ updateInfo, onDismiss }) {
  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 bg-gradient-to-r from-accent to-[#393939] text-white p-4 rounded-xl shadow-lg border border-accent/20">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium">
            {updateInfo.message}
          </p>
          <p className="text-xs opacity-75 mt-1">
            Version {updateInfo.version}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onDismiss}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
            aria-label="Dismiss update notification"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
          >
            Update Now
          </button>
        </div>
      </div>
    </div>
  );
}

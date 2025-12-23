// src/components/UpdateNotification.jsx
"use client";

export default function UpdateNotification({ updateInfo, onDismiss }) {
  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-500">
      <div className="max-w-2xl mx-auto bg-gray-600 text-white p-5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-white">
                New Update Available
              </h3>
              <span className="px-2 py-0.5 bg-yellow-400/90 text-purple-900 rounded-full text-xs font-bold shadow-md">
                v{updateInfo.version}
              </span>
            </div>
            <p className="text-sm text-white/95 leading-relaxed">
              {updateInfo.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onDismiss}
              className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-all duration-200 group"
              aria-label="Dismiss update notification"
              title="Dismiss"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
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
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-300 hover:to-orange-400 active:scale-95 transition-all duration-200 text-sm shadow-lg hover:shadow-2xl flex items-center gap-2 group"
              aria-label="Update application now"
            >
              <span>Update Now</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/app/components/ClientWrapper.js
"use client";

import { useEffect, useState } from "react";
import UpdateNotification from "./UpdateNotification";

export default function ClientWrapper({ children }) {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [updateInfo, setUpdateInfo] = useState(null);

    useEffect(() => {
      if ("serviceWorker" in navigator) {
        if (process.env.NODE_ENV === "production") {
          // Use a versioned URL to force the browser to fetch the new SW file
          // bypassing any HTTP cache for the script itself.
          navigator.serviceWorker
            .register("/sw.js?v=1.0.9")
            .then((registration) => {
              console.log("✅ Service Worker Registered");

              // Check for updates immediately
              registration.update();
            })
            .catch((error) => {
              console.log("ERROR", error);
            });

          // Reload the page when the new Service Worker takes control
          let refreshing = false;
          navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (!refreshing) {
              refreshing = true;
              window.location.reload();
            }
          });

          // Listen for update notifications from service worker
          navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data?.type === "SW_UPDATE_AVAILABLE") {
              setUpdateAvailable(true);
              setUpdateInfo(event.data);
            }
          });
        } else {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => reg.unregister());
          });
        }
      }
    }, []);

  return (
    <div>
      {updateAvailable && updateInfo && (
        <UpdateNotification
          updateInfo={updateInfo}
          onDismiss={() => setUpdateAvailable(false)}
        />
      )}
      {children}
    </div>
  );
}
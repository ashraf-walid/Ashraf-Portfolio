// src/app/components/ClientWrapper.js
"use client";

import { useEffect } from "react";

export default function ClientWrapper({ children }) {
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
        } else {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => reg.unregister());
          });
        }
      }
    }, []);

  return children;
}
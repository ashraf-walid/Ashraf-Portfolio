// src/app/components/ClientWrapper.js
"use client";

import { useEffect } from "react";

export default function ClientWrapper({ children }) {
    useEffect(() => {
      if ("serviceWorker" in navigator) {
        if (process.env.NODE_ENV === "production") {
          navigator.serviceWorker.register("/sw.js")
          .then(() => {
            console.log("✅ Service Worker Registered");
          })
          .catch((error) => { console.log("ERROR",error) })
        } else {
          navigator.serviceWorker.getRegistrations().then((regs) => {
            regs.forEach((reg) => reg.unregister());
          });
        }
      }
    }, []);

  return children;
}

// What does the browser do after "registration"?

// Download the file (sw.js) from the path you specified.

// Run it for the first time in a standalone environment (outside the web page).

// It goes through several stages:

// Install → For initial caching.

// Activate → To become responsible for managing pages.

// After success, the browser stores this site as a Service Worker.

// When you open the site again, the SW is automatically activated without re-registration.
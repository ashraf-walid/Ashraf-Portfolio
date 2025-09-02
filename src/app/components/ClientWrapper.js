// src/app/components/ClientWrapper.js
"use client";

import { useEffect } from "react";

export default function ClientWrapper({ children }) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("/sw.js").then(() => {
            console.log("✅ Service Worker Registered");
          });
        }
    }, []);

  return children;
}

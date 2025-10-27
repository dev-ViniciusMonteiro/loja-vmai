"use client";

import { useState, useEffect } from "react";
import { gtag } from "../utils/gtag";

export default function TrackingToggle() {
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('vmai-tracking');
    if (saved === 'false') {
      setTrackingEnabled(false);
    }
  }, []);

  const toggleTracking = () => {
    const newState = !trackingEnabled;
    setTrackingEnabled(newState);
    localStorage.setItem('vmai-tracking', newState.toString());
    
    if (newState) {
      gtag('event', 'tracking_enabled');
    } else {
      gtag('event', 'tracking_disabled');
    }
  };

  return (
    <button
      onClick={toggleTracking}
      className={`w-8 h-4 rounded-full transition-colors ${
        trackingEnabled ? 'bg-green-500' : 'bg-gray-400'
      }`}
    >
      <div
        className={`w-3 h-3 bg-white rounded-full transition-transform ${
          trackingEnabled ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}
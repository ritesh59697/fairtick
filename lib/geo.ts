"use client";

import { useEffect, useState } from "react";

export interface GeoState {
  isBlocked: boolean;
  country: string;
  loading: boolean;
  simulatedUs: boolean;
}

export function useGeoCheck() {
  const [geo, setGeo] = useState<GeoState>({
    isBlocked: false,
    country: "DEV",
    loading: true,
    simulatedUs: false,
  });

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        setGeo((prev) => ({
          ...prev,
          isBlocked: data.isUS || prev.simulatedUs,
          country: data.country || "UNKNOWN",
          loading: false,
        }));
      } catch (e) {
        setGeo((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    }
    check();
  }, []);

  const toggleSimulateUs = () => {
    setGeo((prev) => {
      const nextSim = !prev.simulatedUs;
      return {
        ...prev,
        simulatedUs: nextSim,
        isBlocked: nextSim || prev.country === "US",
      };
    });
  };

  return { ...geo, toggleSimulateUs };
}

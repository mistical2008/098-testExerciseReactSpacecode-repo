import React, { useState } from "react";
import geoData from "../mockDB/data.json";

const GeoDataContext = React.createContext();
GeoDataContext.displayName = "GeoDataContext";

function GeoDataProvider({ children }) {
  const [data, setData] = useState(geoData);
  const [activePointIndex, setActivePointIndex] = useState(0);
  const value = { data, setData, activePointIndex, setActivePointIndex };
  return (
    <GeoDataContext.Provider value={value}>{children}</GeoDataContext.Provider>
  );
}

function useGeoData() {
  const context = React.useContext(GeoDataContext);
  if (context === undefined) {
    throw new Error(
      `"useGeoData" hook must be used only within "GeoDataProvider"`
    );
  }
  return context;
}

export { GeoDataProvider, useGeoData };

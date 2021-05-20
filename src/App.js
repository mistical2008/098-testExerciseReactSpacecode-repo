import React from "react";
import Map from "./components/Map";
import "./App.css";
import { GeoDataProvider } from "./context/parks-context";

function App() {
  return (
    <GeoDataProvider>
      <Map />
    </GeoDataProvider>
  );
}

export default App;

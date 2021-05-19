import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
} from "react-leaflet";
import { Icon } from "leaflet";
import data from "../../mockDB/data.json";
import markerImg from "./location-marker.png";

export const icon = new Icon({
  iconUrl: markerImg,
  iconSize: [25, 25],
});

function SetViewOnClick() {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

const Map = () => {
  const { currentLocation } = data;
  const [activePoint, setActivePoin] = useState([]);
  const { parkPoints } = data;
  console.log(data);

  return (
    <div>
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.geoapify.com/v1/tile/dark-matter-brown/{z}/{x}/{y}.png?apiKey=e24b101acbd2442093544af11f463dc3"
        />
        {parkPoints.map((point) => (
          <Marker position={[point.latitude, point.longitude]} icon={icon}>
            <Popup>
              <p>
                <b>Адрес:</b> {point.address} <br />
                <b>Модель самоката:</b> {point.citybug}
              </p>
            </Popup>
          </Marker>
        ))}
        <SetViewOnClick />
      </MapContainer>
    </div>
  );
};

export default Map;

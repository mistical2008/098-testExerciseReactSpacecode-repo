import React from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMapEvent,
} from "react-leaflet";
import { Icon } from "leaflet";
import regularMarkerImg from "./location-marker.png";
import currentMarkerImg from "./location-current.png";
import { useGeoData } from "../../context/parks-context";
import Carousel from "../Carousel";
import styles from "./index.module.css";

export const regularMarker = new Icon({
  iconUrl: regularMarkerImg,
  iconSize: [25, 25],
});

export const currentLocationMarker = new Icon({
  iconUrl: currentMarkerImg,
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
  const { data, activePointIndex } = useGeoData();
  const { currentLocation, parkPoints } = data;
  const activePosition = [
    parkPoints[activePointIndex].latitude,
    parkPoints[activePointIndex].longitude,
  ];

  return (
    <div className={styles.mapWrapper}>
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.geoapify.com/v1/tile/dark-matter-brown/{z}/{x}/{y}.png?apiKey=e24b101acbd2442093544af11f463dc3"
        />
        <Marker
          key={currentLocation.join("-")}
          position={currentLocation}
          icon={currentLocationMarker}
        >
          <Popup>
            <p>Я нахожусь здесь :)</p>
          </Popup>
        </Marker>
        {parkPoints.map((point) => (
          <Marker
            key={`${point.longitude}-${point.latitude}`}
            position={[point.latitude, point.longitude]}
            icon={regularMarker}
          >
            <Popup>
              <p>
                <b>Адрес:</b> {point.address} <br />
                <b>Модель самоката:</b> {point.citybug}
              </p>
            </Popup>
          </Marker>
        ))}
        {activePointIndex >= 0 && (
          <Popup position={activePosition}>
            <p>
              <b>Адрес:</b> {parkPoints[activePointIndex].address} <br />
              <b>Модель самоката:</b> {parkPoints[activePointIndex].citybug}
            </p>
          </Popup>
        )}
        <SetViewOnClick />
      </MapContainer>
      <div className={styles.overflowWrapper}>
        <Carousel />
      </div>
    </div>
  );
};

export default Map;

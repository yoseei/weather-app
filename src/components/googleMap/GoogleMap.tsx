import React, { useState } from "react";
import styles from "./GoogleMap.module.scss";
import GoogleMapReact from "google-map-react";

type ResultStateType = {
  result: {
    lon: string;
    lat: string;
  };
};

const GoogleMap = ({ result }: ResultStateType) => {
  const [map, setMap] = useState(null);
  // result.lon:'123' 先程のNumber関数を用いて数値に変換する

  const center = { lat: Number(result.lat), lng: Number(result.lon) };

  console.log(center);
  const defaultLatLng = {
    lat: 35.39,
    lng: 139.44,
  };

  return (
    <div style={{ height: "300px", width: "300px" }}>
      <GoogleMapReact
        defaultCenter={defaultLatLng}
        defaultZoom={8}
        center={center}
      />
    </div>
  );
};

export default GoogleMap;

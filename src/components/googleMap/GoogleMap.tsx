import React from "react";
import styles from "./GoogleMap.module.scss";
import GoogleMapReact from "google-map-react";

type ResultStateType = {
  currentResult: {
    lon: string;
    lat: string;
  };
};

const GoogleMap = ({ currentResult }: ResultStateType) => {
  // result.lon:'123' 先程のNumber関数を用いて数値に変換する
  const center = {
    lat: Number(currentResult.lat),
    lng: Number(currentResult.lon),
  };
  const GoogleMapAPIKey = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

  const handleApiLoaded = ({ map, maps }: any) => {
    new maps.Marker({
      map,
      position: defaultLatLng,
    });
  };

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  return (
    <div style={{ height: "300px", width: "300px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GoogleMapAPIKey }}
        defaultCenter={defaultLatLng}
        defaultZoom={12}
        center={center}
        onGoogleApiLoaded={handleApiLoaded}
        yesIWantToUseGoogleMapApiInternals={true}
      />
    </div>
  );
};

export default GoogleMap;

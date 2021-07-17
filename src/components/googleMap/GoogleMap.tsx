import GoogleMapReact from "google-map-react";

type StateType = {
  currentLat: number;
  currentLng: number;
};

const GoogleMap = ({ currentLat, currentLng }: StateType) => {
  // result.lon:'123' 先程のNumber関数を用いて数値に変換する
  const center = {
    lat: currentLat,
    lng: currentLng,
  };
  const GoogleMapAPIKey = String(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

  const handleApiLoaded = ({ map, maps }: any) => {
    new maps.Marker({
      map,
      position: center,
    });
  };

  return (
    <div style={{ height: "250px", width: "400px" }}>
      <GoogleMapReact
        center={center}
        bootstrapURLKeys={{ key: GoogleMapAPIKey }}
        defaultZoom={12}
        onGoogleApiLoaded={handleApiLoaded}
        yesIWantToUseGoogleMapApiInternals={true}
      />
    </div>
  );
};

export default GoogleMap;

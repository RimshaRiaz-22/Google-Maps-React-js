import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAYEkl4Du9zEcm1X2u1HEepM8DAuk9dYUk",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onClick={(e) => {
          setMarkers(
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng()
            }
          )
          // console.log(markers.lat)
          // console.log(markers.lng)
        }}
        onLoad={onMapLoad}
      >
          <Marker key="added" position={{ lat: markers.lat, lng: markers.lng }}
          
          />
      </GoogleMap>
    </div>
  );
}


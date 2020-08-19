import React, { useState } from "react";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: -33.4372,
  lng: -70.6506,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [currentMarker, setCurrentMarker] = useState();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const currentMarkerMenu = (e) => {
    setCurrentMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      time: new Date(),
    });
  };

  const addMarkers = () => {
    setMarkers((markers) => [
      ...markers,
      {
        lat: currentMarker.lat,
        lng: currentMarker.lng,
        time: currentMarker.time,
      },
    ]);
    setCurrentMarker(null);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={currentMarkerMenu}
      >
        {currentMarker ? (
          <div>
            <Marker
              key={currentMarker.time.toISOString()}
              position={{ lat: currentMarker.lat, lng: currentMarker.lng }}
            />
            <InfoWindow
              position={{ lat: currentMarker.lat, lng: currentMarker.lng }}
              onCloseClick={() => {
                setCurrentMarker(null);
              }}
            >
              <div>
                <h4>Agregar punto?</h4>
                <a href="#" onClick={addMarkers}>
                  Si
                </a> <br></br>
                <a href="#"
                onClick={() => {
                  setCurrentMarker(null);
                }}
                >No</a>
              </div>
            </InfoWindow>
          </div>
        ) : null}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

export default App;

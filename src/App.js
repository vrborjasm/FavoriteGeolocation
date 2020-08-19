import React, { useState, useRef } from "react";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";

import MarkersList from "./components/MarkersList";
import CreateMarker from "./components/CreateMarker";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const mapContainerStyle2 = {
  width: "25vw",
  height: "25vh",
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
  const [selected, setSelected] = useState();

  const mapRef = useRef();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const panTo = (lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setSelected({
      lat,
      lng,
    });
  };

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

  const deleteMarker = (time) => {
    setMarkers(markers.filter((marker) => marker.time !== time));
  };

  return (
    <div className="container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
        onClick={currentMarkerMenu}
      >
        <div className="container-list">
          <MarkersList
            markers={markers}
            panTo={panTo}
            deleteMarker={deleteMarker}
          />
        </div>

        <div className="container-view">
          {selected ? (
            <GoogleMap mapContainerStyle={mapContainerStyle2}>
              <StreetViewPanorama position={selected} visible={true} />
            </GoogleMap>
          ) : null}
        </div>

        {currentMarker ? (
          <CreateMarker
            currentMarker={currentMarker}
            addMarkers={addMarkers}
            setCurrentMarker={setCurrentMarker}
          />
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

import React from 'react';
import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
}
const center = {
  lat: -33.4372,
  lng: -70.6506
}

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8}
        center={center}
        >          
        </GoogleMap>
    </div>
  );
}

export default App;

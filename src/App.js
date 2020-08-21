import React, { useState, useRef } from "react";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import MarkersList from "./components/MarkersList";
import CreateMarker from "./components/CreateMarker";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "88vh",
};

const streetViewContainerStyle = {
  width: "25vw",
  height: "25vh",
};

const center = {
  lat: -33.4372,
  lng: -70.6506,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);

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

  const handleChange = (e) => {
    setCurrentMarker({
      ...currentMarker,
      [e.target.name]: e.target.value,
    });
  };

  const addMarkers = async () => {
    try {
      const response = await Geocode.fromLatLng(
        currentMarker.lat,
        currentMarker.lng
      );
      const address = response.results[0].formatted_address;
      setMarkers((markers) => [
        ...markers,
        {
          ...currentMarker,
          address,
        },
      ]);
    } catch (err) {
      console.error(err);
    }
    setCurrentMarker(null);
  };

  const deleteMarker = (time) => {
    setMarkers(markers.filter((marker) => marker.time !== time));
  };

  return (
    <>
      <header className="header">
        <h1 className="title">
          {" "}
          <LocationOnIcon />
          GeoFavorites{" "}
        </h1>
      </header>
      <div className="container">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          options={options}
          zoom={12}
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
              <GoogleMap mapContainerStyle={streetViewContainerStyle}>
                <StreetViewPanorama position={selected} visible={true} />
              </GoogleMap>
            ) : null}
          </div>

          {currentMarker ? (
            <CreateMarker
              currentMarker={currentMarker}
              addMarkers={addMarkers}
              setCurrentMarker={setCurrentMarker}
              handleChange={handleChange}
            />
          ) : null}

          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              label={marker.nickname
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), "")}
              onClick={() => panTo(marker.lat, marker.lng)}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  );
}

export default App;

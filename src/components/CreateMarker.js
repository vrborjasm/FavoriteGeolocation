import React from "react";
import {
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const CreateMarker = ({currentMarker,addMarkers,setCurrentMarker}) => {
  return (
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
          </a>{" "}
          <br></br>
          <a
            href="#"
            onClick={() => {
              setCurrentMarker(null);
            }}
          >
            No
          </a>
        </div>
      </InfoWindow>
    </div>
  );
};

export default CreateMarker;

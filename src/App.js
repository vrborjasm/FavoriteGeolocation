import React, { useState, useRef } from "react";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

/*Import para componente de lista*/

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ListIcon from "@material-ui/icons/List";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

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

  const classes = useStyles();
  const [markers, setMarkers] = useState([]);
  const [currentMarker, setCurrentMarker] = useState();
  const [open, setOpen] = useState(false);

  const mapRef = useRef();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const handleClick = () => {
    setOpen(!open);
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const panTo = (lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
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
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Marker List" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {markers.length !== 0 ? (
              markers.map((marker) => (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => panTo(marker.lat, marker.lng)}
                >
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`lat ${marker.lat} lng ${marker.lng}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteMarker(marker.time)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <ListItem button className={classes.nested}>
                <ListItemText primary="No hay ningun marcador" />
              </ListItem>
            )}
          </List>
        </Collapse>
      </List>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onMapLoad}
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

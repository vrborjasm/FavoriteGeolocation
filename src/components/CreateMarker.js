import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CreateMarker = ({ currentMarker, addMarkers, setCurrentMarker }) => {
  const classes = useStyles();

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
        <div className="text-center">
          <h4>Agregar punto?</h4>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={addMarkers}
          >
            Agregar
          </Button>
          <br></br>
          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            startIcon={<ClearIcon />}
            onClick={() => {
              setCurrentMarker(null);
            }}
          >
            Cancelar
          </Button>
        </div>
      </InfoWindow>
    </div>
  );
};

export default CreateMarker;

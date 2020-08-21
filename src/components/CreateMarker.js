import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CreateMarker = ({
  currentMarker,
  addMarkers,
  setCurrentMarker,
  handleChange,
}) => {
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
          <h4>Add this marker?</h4>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-basic"
              label="Nickname"
              name="nickname"
              onChange={handleChange}
            />
          </form>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={addMarkers}
          >
            Add
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
            Cancel
          </Button>
        </div>
      </InfoWindow>
    </div>
  );
};

export default CreateMarker;

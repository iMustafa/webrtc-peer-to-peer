import { Fragment } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "#FFF",
    fontSize: 16,
  },
}));

const PeerLocation = () => {
  const classes = useStyles();
  const { roomId } = useSelector((state) => state.user);
  const { peerLocation } = useSelector((state) => state.peer);

  return roomId ? (
    <Typography className={classes.root}>
      {peerLocation.country} - {peerLocation.city}
    </Typography>
  ) : (
    <Fragment></Fragment>
  );
};

export default connect(null, {})(PeerLocation);

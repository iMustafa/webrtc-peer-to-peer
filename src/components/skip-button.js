import { Fragment } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const useStyles = makeStyles(() => ({
  skipButton: {
    color: "#FFF",
    fontSize: 50,
  },
}));

const SkipButton = ({ socket, isMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSearching, roomId, skips } = useSelector((state) => state.user);

  const skipCall = () => {
    if (roomId) {
      dispatch({ type: "SET_SHOW_ADD", payload: false });
      dispatch({ type: "SKIP" });
      if (skips === 3) {
        dispatch({ type: "SET_SHOW_ADD", payload: true });
        socket.emit("exit", { room: roomId });
      } else {
        socket.emit("skip", { room: roomId });
      }
    }
  };

  return roomId ? (
    isMobile ? (
      <IconButton onClick={skipCall}>
        <SkipNextIcon style={{ color: "#FFF" }} />
      </IconButton>
    ) : (
      <IconButton onClick={skipCall}>
        <SkipNextIcon className={classes.skipButton} />
      </IconButton>
    )
  ) : (
    <Fragment />
  );
};

export default connect(null, {})(SkipButton);

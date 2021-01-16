import { Fragment } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles(() => ({
  playButton: {
    color: "#FFF",
    fontSize: 82,
  },
}));

const StopButton = ({ socket, isMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId, isSearching } = useSelector((state) => state.user);

  const handleStop = () => {
    dispatch({ type: "SET_IS_SEARCHING", payload: false });
    socket.emit("exit", { room: roomId });
  };

  return roomId ? (
    isMobile ? (
      <IconButton onClick={handleStop}>
        <StopIcon style={{ color: "#FFF" }} />
      </IconButton>
    ) : (
      <IconButton style={{ marginLeft: 25 }} onClick={handleStop}>
        <StopIcon className={classes.playButton} />
      </IconButton>
    )
  ) : (
    <Fragment />
  );
};

export default connect(null, {})(StopButton);

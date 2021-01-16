import {Fragment} from "react";
import { makeStyles } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#318FC9",
    color: "#FFF",
    padding: "10px 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "30px",
    "&:hover": {
      backgroundColor: "#318FC9",
    },
  },
  icon: {
    color: "#FFF",
  },
  text: {
    color: "#FFF",
  },
  playButton: {
    color: "#FFF",
    fontSize: 82,
  },
}));

const StartButton = ({ socket, isMobile, hide }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isShowingAd, isSearching} = useSelector((state) => state.user);

  const handleStart = () => {
    dispatch({ type: "SET_IS_SEARCHING", payload: true });
    dispatch({ type: "SET_SHOW_AD", payload: false });
    socket.emit("pair-to-room");
  };

  return isShowingAd && !isSearching ? (
    isMobile ? (
      <IconButton onClick={handleStart}>
        <PlayArrowIcon style={{ color: "#FFF" }} />
      </IconButton>
    ) : (
      <IconButton onClick={handleStart}>
        <PlayArrowIcon className={classes.playButton} />
      </IconButton>
    )
  ) : !hide ? (
    <Button className={classes.root} onClick={handleStart}>
      <PlayArrowIcon className={classes.icon} />
      <Typography className={classes.text}>Start</Typography>
    </Button>
  ) : <Fragment />
};

export default connect(null, {})(StartButton);

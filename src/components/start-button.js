import { makeStyles } from "@material-ui/core";
import { connect, useDispatch, useSelector } from "react-redux";
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
}));

const StartButton = ({ setIsSearching, socket }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch({ type: "SET_IS_SEARCHING", payload: true });
    socket.emit("pair-to-room");
  };

  return (
    <Button className={classes.root} onClick={handleStart}>
      <PlayArrowIcon className={classes.icon} />
      <Typography className={classes.text}>Start</Typography>
    </Button>
  );
};

export default connect(null, {})(StartButton);

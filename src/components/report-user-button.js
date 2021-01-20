import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FlagIcon from "@material-ui/icons/Flag";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: 10,
    left: 10
  },
}));

const ReportUserButton = ({ socket }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId, skips } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch({ type: "SKIP" });
    if (skips === 2) {
      dispatch({ type: "SET_SHOW_AD", payload: true });
      socket.emit("exit", { room: roomId, isReport: true });
    } else {
      socket.emit("skip", { room: roomId, isReport: true });
    }
  };

  if (!roomId) return null;

  return (
    <Button className={classes.root} onClick={handleClick}>
      <FlagIcon style={{color: "#FFF"}} />
      <Typography style={{color: "#FFF"}}>Report User</Typography>
    </Button>
  );
};

export default connect(null, {})(ReportUserButton);

import { connect, useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FlagIcon from "@material-ui/icons/Flag";

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  root: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
}));

const ReportUserButton = ({ socket, isMobile }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { roomId, skips } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch({ type: "SKIP" });
    socket.emit("skip", { room: roomId, isReport: true });
  };

  if (!roomId) return null;

  return (
    <Button className={isMobile ? classes.mobileRoot : classes.root} onClick={handleClick}>
      <FlagIcon style={{ color: "#FFF" }} />
      <Typography style={{ color: "#FFF" }}>Report User</Typography>
    </Button>
  );
};

export default connect(null, {})(ReportUserButton);

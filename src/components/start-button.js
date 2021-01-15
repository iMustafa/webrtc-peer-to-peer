import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#318FC9",
    color: "#FFF",
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '30px',
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

  return (
    <Button
      className={classes.root}
      onClick={() => {
        setIsSearching(true);
        socket.emit("pair-to-room");
      }}
    >
      <PlayArrowIcon className={classes.icon} />
      <Typography className={classes.text}>Start</Typography>
    </Button>
  );
};

export default StartButton;

import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Logo from "../images/logo.svg";

const useStyles = makeStyles(() => ({
  root: {
    width: 150,
    position: "absolute",
    top: 10,
    left: 10,
  },
  img: {
    width: "100%",
  },
}));

const AppLogo = () => {
  const classes = useStyles();
  const { roomId } = useSelector((state) => state.user);

  if (!roomId) return null;

  return (
    <div className={classes.root}>
      <img src={Logo} className={classes.img} />
    </div>
  );
};

export default connect(null, {})(AppLogo);

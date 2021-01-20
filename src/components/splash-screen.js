import { Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, connect } from "react-redux";
import Logo from "../images/logo.svg";
import GenderButton from "./gender-button";
import StartButton from "./start-button";
import UserCount from "./user-count";
import Agreement from "./agreement";

const useStyles = makeStyles(() => ({
  part: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const SplashScreen = ({ socket }) => {
  const classes = useStyles();
  const { userId, roomId, isSearching, isShowingAd, isBanned } = useSelector(
    (state) => state.user
  );

  return !!(userId && !roomId && !isSearching && !isShowingAd && !isBanned) ? (
    <div className="overlay">
      <div className={classes.part}>
        <img src={Logo} />
        <UserCount />
      </div>
      <div className="buttons-container">
        <GenderButton />
        <StartButton socket={socket} />
      </div>
      <div className={classes.part}>
        <Agreement />
      </div>
    </div>
  ) : (
    <Fragment />
  );
};

export default connect(null, {})(SplashScreen);

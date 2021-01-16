import { Fragment } from "react";
import { useSelector, connect } from "react-redux";
import GenderButton from "./gender-button";
import StartButton from "./start-button";

const SplashScreen = ({ socket }) => {
  const { userId, roomId, isSearching, isShowingAd } = useSelector((state) => state.user);

  return !!(userId && !roomId && !isSearching && !isShowingAd) ? (
    <div className="overlay">
      <div className="buttons-container">
        <GenderButton />
        <StartButton socket={socket} />
      </div>
    </div>
  ) : (
    <Fragment />
  );
};

export default connect(null, {})(SplashScreen);

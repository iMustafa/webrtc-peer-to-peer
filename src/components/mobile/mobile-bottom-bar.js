import { Fragment } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import StopButton from "../stop-button";
import SkipButton from "../skip-button";
import StartButton from "../start-button";

import MobileTextField from "./mobile-text-field";

const MobileBottomPart = ({ socket }) => {
  const dispatch = useDispatch();
  const isShowingInput = useSelector((state) => state.mobile.isShowingInput);
  const { isShowingAd, isSearching, roomId } = useSelector(
    (state) => state.user
  );

  return isShowingAd ? (
    <StartButton socket={socket} isMobile hide />
  ) : !isSearching && !roomId ? (
    <Fragment />
  ) : (
    <Fragment>
      {!isShowingInput && (
        <IconButton
          onClick={() => {
            dispatch({ type: "TOGGLE_INPUT", payload: true });
          }}
        >
          <ChatIcon style={{ color: "#FFF" }} />
        </IconButton>
      )}
      {isShowingInput ? (
        <MobileTextField socket={socket} />
      ) : (
        <Fragment>
          <SkipButton socket={socket} isMobile />
          <StopButton socket={socket} isMobile />
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect(null, {})(MobileBottomPart);

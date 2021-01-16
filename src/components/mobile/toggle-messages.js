import { useSelector, useDispatch, connect } from "react-redux";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import IconButton from "@material-ui/core/IconButton";

const ToggleChatButton = () => {
  const dispatch = useDispatch();
  const isShowingMsgs = useSelector((state) => state.mobile.isShowingMsgs);

  const toggleMsgs = () => {
    dispatch({ type: "TOGGLE_MSGS", payload: !isShowingMsgs });
  };

  return isShowingMsgs ? (
    <IconButton onClick={toggleMsgs}>
      <SpeakerNotesOffIcon style={{ color: "#FFF" }} />
    </IconButton>
  ) : (
    <IconButton onClick={toggleMsgs}>
      <SpeakerNotesIcon style={{ color: "#FFF" }} />
    </IconButton>
  );
};

export default connect(null, {})(ToggleChatButton);

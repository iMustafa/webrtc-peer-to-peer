import { useState } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

const MobileTextField = ({ socket }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { userId, gender } = useSelector((state) => state.user);
  const isShowingInput = useSelector((state) => state.mobile.isShowingInput);

  const sendMessage = () => {
    socket.emit("message", { message, sentBy: userId, gender });
    setMessage("");
  };

  return (
    <div className="input-mobile">
      <IconButton
        onClick={() => {
          dispatch({ type: "TOGGLE_INPUT", payload: false });
        }}
      >
        <CloseIcon />
      </IconButton>
      <FormControl className="message-input-mobile">
        <Input
          style={{ position: "relative" }}
          disableUnderline={true}
          value={message}
          placeholder="Type your message here"
          onFocus={() => {
            dispatch({ type: "TOGGLE_KEYBOARD", payload: true });
          }}
          onBlur={() => {
            dispatch({ type: "TOGGLE_KEYBOARD", payload: false });
          }}
          onKeyPress={(e) => {
            const { charCode } = e;
            if (charCode === 13) {
              sendMessage();
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default connect(null, {})(MobileTextField);

import { useState, useRef, useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
// import Picker from "emoji-picker-react";
import EmojiPicker from "./emoji-picker";
import Message from "./message";
import ReportIssueButton from "./report-issue-button";

const DesktopMessages = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const { userId, gender, isShowingEmojiPicker } = useSelector(
    (state) => state.user
  );
  const [message, setMessage] = useState("");
  const msgsContainerRef = useRef();

  const sendMessage = () => {
    if (message) {
      dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
      socket.emit("message", { message, sentBy: userId, gender });
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("message-recieved", ($message) => {
      dispatch({ type: "ADD_MESSAGE", payload: $message });
      msgsContainerRef.current.scrollTop =
        msgsContainerRef.current.scrollHeight;
    });
  }, []);

  return (
    <div className="room-messages">
      <div
        className="messages-container"
        ref={msgsContainerRef}
        onClick={() => {
          dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
        }}
      >
        <ReportIssueButton />
        {messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>

      <FormControl className="message-input">
        <Input
          style={{ position: "relative" }}
          type="text"
          disableUnderline={true}
          value={message}
          placeholder="Type your message here and press Enter"
          onKeyPress={(e) => {
            const { charCode } = e;
            if (charCode === 13) {
              sendMessage();
              dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
            }
          }}
          onFocus={() => {
            dispatch({ type: "SHOW_EMOJI_PICKER", payload: false });
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  dispatch({
                    type: "SHOW_EMOJI_PICKER",
                    payload: !isShowingEmojiPicker,
                  });
                }}
              >
                <InsertEmoticonIcon />
              </IconButton>

              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setMessage(message.concat(emoji));
                }}
              />

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

export default connect(null, {})(DesktopMessages);

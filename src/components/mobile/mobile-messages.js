import { useEffect, useRef } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import Message from "../message";

const MobileMessage = ({ socket }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const isShowingMsgs = useSelector((state) => state.mobile.isShowingMsgs);
  const msgsContainerRef = useRef();

  useEffect(() => {
    socket.on("message-recieved", ($message) => {
      dispatch({ type: "ADD_MESSAGE", payload: $message });
      msgsContainerRef.current.scrollTop =
        msgsContainerRef.current.scrollHeight;
    });
  }, []);

  return (
    <div className="messages-container-mobile" ref={msgsContainerRef} hidden={!isShowingMsgs}>
      {messages.map((m, i) => (
        <Message isMobile key={i} message={m} />
      ))}
    </div>
  );
};

export default connect(null, {})(MobileMessage);

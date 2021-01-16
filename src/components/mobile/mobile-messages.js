import { useSelector, connect } from "react-redux";
import Message from "../message";

const MobileMessage = () => {
  const messages = useSelector((state) => state.messages.messages);

  return (
    <div className="messages-container-mobile">
      {messages.map((m, i) => (
        <Message key={i} message={m} />
      ))}
    </div>
  );
};

export default connect(null, {})(MobileMessage);

import { combineReducers } from "redux";
import MessagesReducer from "./messages-reducer";

export default combineReducers({
  messages: MessagesReducer,
});

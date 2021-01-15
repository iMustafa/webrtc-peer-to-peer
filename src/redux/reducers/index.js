import { combineReducers } from "redux";
import MessagesReducer from "./messages.reducer";
import UserReducer from './user.reducer';

export default combineReducers({
  messages: MessagesReducer,
  user: UserReducer
});

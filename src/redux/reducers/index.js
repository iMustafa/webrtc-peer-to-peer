import { combineReducers } from "redux";
import MessagesReducer from "./messages.reducer";
import UserReducer from './user.reducer';
import PeerReducer from './peer.reducer';

export default combineReducers({
  messages: MessagesReducer,
  user: UserReducer,
  peer: PeerReducer
});

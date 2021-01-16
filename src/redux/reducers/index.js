import { combineReducers } from "redux";
import MessagesReducer from "./messages.reducer";
import UserReducer from './user.reducer';
import PeerReducer from './peer.reducer';
import MobileReducer from "./mobile.reducer";

export default combineReducers({
  messages: MessagesReducer,
  user: UserReducer,
  peer: PeerReducer,
  mobile: MobileReducer
});

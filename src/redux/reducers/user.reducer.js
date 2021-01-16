const INITIAL_STATE = {
  gender: "male",
  userId: null,
  roomId: null,
  guestId: null,
  isSearching: false
};

const MessagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_GENDER":
      return { ...state, gender: action.payload };
    case "SET_USER_ID":
      return { ...state, userId: action.payload };
    case "SET_ROOM_ID":
      return { ...state, roomId: action.payload };
    case "SET_GUEST_ID":
      return { ...state, guestId: action.payload };
    case "SET_IS_SEARCHING":
      return {...state, isSearching: action.payload};
    case "END_CALL":
      return {...state, roomId: null, guestId: null, isSearching: true}
    default:
      return { ...state };
  }
};

export default MessagesReducer;

const INITIAL_STATE = {
  gender: "male",
  userId: null,
  roomId: null,
  guestId: null,
  isSearching: false,
  skips: 0,
  isPairing: false,
  isShowingAd: false,
  isShowingEmojiPicker: false,
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
      return { ...state, isSearching: action.payload };
    case "END_CALL":
      return { ...state, roomId: null, guestId: null, isSearching: true };
    case "SKIP":
      return { ...state, skips: state.skips + 1 };
    case "SET_IS_PAIRING":
      return { ...state, isPairing: action.payload };
    case "DISCONNECT":
      return {
        ...state,
        roomId: null,
        guestId: null,
        isSearching: false,
        skips: 0,
        isPairing: false,
      };
    case "SET_SHOW_ADD":
      return { ...state, isShowingAd: action.payload };
    case "SHOW_EMOJI_PICKER":
      return { ...state, isShowingEmojiPicker: action.payload };
    default:
      return { ...state };
  }
};

export default MessagesReducer;

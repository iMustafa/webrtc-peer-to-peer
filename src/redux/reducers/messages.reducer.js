const INITIAL_STATE = {
  messages: [],
};

const MessagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "CLEAR_MESSAGES":
      return { ...state, messages: [] };
    default:
      return { ...state };
  }
};

export default MessagesReducer;

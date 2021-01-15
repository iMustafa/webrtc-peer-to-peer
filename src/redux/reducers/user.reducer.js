const INITIAL_STATE = {
  gender: "male",
};

const MessagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_GENDER":
      return { ...state, gender: action.payload };
    default:
      return { ...state };
  }
};

export default MessagesReducer;

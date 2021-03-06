const INITIAL_STATE = {
  isShowingInput: false,
  isKeyboardFocused: false,
  isShowingMsgs: true
}

const MobileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_INPUT":
      return {...state, isShowingInput: action.payload}
    case "TOGGLE_KEYBOARD":
      return {...state, isKeyboardFocused: action.payload}
    case "TOGGLE_MSGS":
      return {...state, isShowingMsgs: action.payload}
    default:
      return { ...state };
  }
};

export default MobileReducer;

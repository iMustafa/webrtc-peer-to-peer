const INITIAL_STATE = {
  isShowingInput: false
}

const MobileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_INPUT":
      return {...state, isShowingInput: action.payload}
    default:
      return { ...state };
  }
};

export default MobileReducer;

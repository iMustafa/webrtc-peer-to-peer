const INITIAL_STATE = {
  isAuthenticated: false,
};

const AdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATION":
      return { ...state, isAuthenticated: action.payload };
    default:
      return { ...state };
  }
};

export default AdminReducer;

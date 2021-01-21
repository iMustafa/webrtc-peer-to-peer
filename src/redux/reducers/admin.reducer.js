const INITIAL_STATE = {
  isAuthenticated: false,
  activePage: "BANNED_USERS",
};

const AdminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATION":
      return { ...state, isAuthenticated: action.payload };
    case "ADMIN_NAVIGATION":
      return { ...state, activePage: action.payload };
    default:
      return { ...state };
  }
};

export default AdminReducer;

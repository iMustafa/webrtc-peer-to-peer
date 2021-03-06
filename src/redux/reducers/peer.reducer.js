const INITIAL_STATE = {
  call: null,
  facingMode: "user",
  peerLocation: {}
}

const PeerReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SET_CALL":
      return {...state, call: action.payload}
    case "SET_FACING_MODE":
      return {...state, facingMode: action.payload}
    case "SET_PEER_LOCATION":
      return {...state, peerLocation: action.payload}
    default:
      return {...state}
  }
}

export default PeerReducer
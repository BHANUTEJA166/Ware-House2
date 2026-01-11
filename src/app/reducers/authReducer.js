const initialState = {
  isLoggedIn: false,
  role: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isLoggedIn: true,
        role: action.payload
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;

const auth = (state, dispatch) => {
  switch (dispatch.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...dispatch.payload,
        isLogin: true,
        isSignUp: false,
      };

    case "LOGOUT_SUCCESS":
      return {
        ...dispatch.payload,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;

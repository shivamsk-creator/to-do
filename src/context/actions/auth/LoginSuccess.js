export default (payload) => (dispatch) => {
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: payload,
  });
};

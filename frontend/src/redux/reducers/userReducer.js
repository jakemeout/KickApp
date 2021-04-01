import {
CREATE_CURRENT_USER,
LOGIN,
ERROR
// SIGNUP
} from "../actionTypes";
const initialState = {
  user: {},
  loggedIn: false,
  error: null
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CURRENT_USER:
      return {
        ...state,
        ...action.user,
        loggedIn: true
      }
    case LOGIN:
      return {
        ...state,
        ...action.user,
        loggedIn: true
      }
    case ERROR:
        return {
          ...state,
          error: action.error
      }
    default:
      return state;
  }
};
export default userReducer;

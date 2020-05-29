import { userLogin } from "../actions/LoginAction";

const localUser = localStorage.getItem('user');
const initialState = {
  user: localUser ? JSON.parse(localUser) : {},
  values: []
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "USER_LOGIN_SUCCESS":
      console.log(payload);
      localStorage.setItem('user', JSON.stringify(payload))
      return {
        ...state,
        user: payload,
      };
    case "FETCH_VALUES_SUCCESS":
      return {
        ...state,
        values: payload,
      };
    case "ADD_VALUE_SUCCESS":
      return {
        ...state,
        values: [...state.values, payload]
      };
    default:
      return state;
  }
};

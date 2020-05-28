import { userLogin } from "../actions/LoginAction";

const initialState = {
  user: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

import { axiosWithAuth } from "../utils/axiousWithAuth";

export const userLogin = (logInData) => {
  return (dispatch) => {
    dispatch({ type: "USER_LOGIN_START" });
    axiosWithAuth()
      .post("https://essentialismapi.herokuapp.com/api/users/login", logInData)
      .then((res) => {
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });
        localStorage.setItem("token", res.data.token);
      });
  };
};

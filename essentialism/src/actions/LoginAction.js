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

export const fetchValues = _ => dispatch => {
  dispatch({ type: "FETCH_VALUES_START"});
  axiosWithAuth()
      .get("https://essentialismapi.herokuapp.com/api/values")
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "FETCH_VALUES_SUCCESS", payload: res.data });
      });
};

export const addValue = value => dispatch => {
  dispatch({ type: "ADD_VALUE_START"});
  axiosWithAuth()
      .post(`https://essentialismapi.herokuapp.com/api/values`, value)
      .then((res) => {
        console.log(res);
        // history.go(0);
        dispatch({ type: "ADD_VALUE_SUCCESS", payload: res.data });
      })
}
  


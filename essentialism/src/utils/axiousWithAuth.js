import axios from "axios";

// create a new "instance" of the axios module that has the Auth header built-in

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://front-end-ecugp5cl3.now.sh/",
  });
};

// https://essentialismapi.herokuapp.com

// baseURL:"https://essentialismapi.herokuapp.com/api"

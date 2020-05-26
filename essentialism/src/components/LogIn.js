import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";

const initialLogInValues = {
  username: "",
  password: "",
};

const initialLogInErrors = {
  username: "",
  password: "",
};

function LogIn() {
  const [user, setUser] = useState({ username: "", password: "" });

  // Event Handlers
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // const handleSubmit = event => {
  //     event.preventDefault();
  //     console.log(user.name);
  //     console.log(user.password);
  // };

  const LoginSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://essentialismapi.herokuapp.com/api/users/login", user)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.payload);
        // push("/essetialism");
      });
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={LoginSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default LogIn;

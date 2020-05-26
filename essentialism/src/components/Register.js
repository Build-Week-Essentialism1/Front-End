import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";

const initialRegisterValues = {
  username: "",
  password: "",
  email: "",
};

const initialRegisterErrors = {
  username: "",
  password: "",
  email: "",
};

function Register() {
  const [user, setUser] = useState(initialRegisterValues);

  // Event Handlers
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // onSubmit function
  // const handleSubmit = event => {
  //     event.preventDefault();
  //     console.log(user.name);
  //     console.log(user.password);
  //     console.log(user.email)
  // };

  const RegisterSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/users/register", user)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.payload);
        // push("/");
      })
      .catch((err) => {
        console.log(err, "This is the error");
      });
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={RegisterSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Register;

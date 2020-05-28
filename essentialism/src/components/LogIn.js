import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../actions/LoginAction";

const initialLogInValues = {
  username: "",
  password: "",
};

const initialLogInErrors = {
  username: "",
  password: "",
};

const formSchema = yup.object({
  username: yup
    .string()
    .min(3, "Username must be at least three characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least six characters long")
    .required("Password is required"),
});

function LogIn(props) {
  const [user, setUser] = useState({
    username: props.user.username,
    password: props.user.username,
  });
  const [formErrors, setFormErrors] = useState(initialLogInErrors);
  const [formState, setFormState] = useState(initialLogInValues);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { push } = useHistory();

  // form validation useEffect
  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  // validation function

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  // Event Handlers
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // const LoginSubmit = (e) => {
  //   e.preventDefault();
  // axiosWithAuth()
  //   .post("https://essentialismapi.herokuapp.com/api/users/login", user)
  //   .then((res) => {
  //     console.log(res.data);
  // localStorage.setItem("token", res.data.token);
  // props.userLogin(user);
  // push("/dashboard")
  // setUser(res.data);
  // console.log("success", user);
  // setFormState(initialLogInValues);

  // })

  // .catch((err) => console.log(err, "It went wrong"));
  // };
  return (
    <div className="login">
      <h1>Log In</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.userLogin(user);
          push("/dashboard");
        }}
      >
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

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    user: state,
  };
};

export default connect(mapStateToProps, { userLogin })(LogIn);

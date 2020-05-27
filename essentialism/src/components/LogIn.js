import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";

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
    .required("Password is required")
})

function LogIn() {
  // login state
  const [user, setUser] = useState(initialLogInValues);
  // error state
  const [formErrors, setFormErrors] = useState(initialLogInErrors)
  // const [formState, setFormState] = useState(initialLogInValues)
  const [ buttonDisabled, setButtonDisabled] = useState(true)

  const { push } = useHistory();

 

  //handle changes on login form
  const handleChange = event => {
    event.persist()
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }


  // validation function

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(event.target.type === "checkbox" ? event.target.checked : event.target.value)      
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: ""
        });
        console.log(error)
      })
      .catch(err => {
        console.log("Validate", err)
        setFormErrors({
          ...formErrors,
          [e.target.name]: err.errors[0]
        });
      });
  }

  // Event Handlers
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://essentialismapi.herokuapp.com/api/users/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        push("/dashboard");
        setUser({
          username:"",
          pa
        });
        console.log("success", user);

        setFormState(initialLogInValues);
      })
      .catch(err => console.log(err.response));
  };

  // form validation useEffect
  useEffect(() => {
    formSchema.isValid(user).then(valid => {
      setButtonDisabled(!valid)
    });
  }, [user]);



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

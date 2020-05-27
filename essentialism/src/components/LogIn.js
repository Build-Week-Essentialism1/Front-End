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
  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...user,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checkbox :
          e.target.value
    };
    validateChange(e);
    setUser(newFormData)
  };


  // validation function

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.type === "checkbox" ? e.target.checked : e.target.value)      
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: ""
        });
        
      })
      .catch(err => {
        console.log("Validate", err)
        setFormErrors({
          ...formErrors,
          [e.target.name]: err.errors[0]
        });
      });
  }

  const LoginSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://essentialismapi.herokuapp.com/api/users/login", user)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        push("/dashboard");
        setUser({
          username:"",
          password:""
        });
        console.log("success", user);

        setUser(initialLogInValues);
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
            onChange={inputChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={inputChange}
          />
        </div>

        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <button disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  );
}

export default LogIn;

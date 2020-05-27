import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

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

const formSchema = yup.object().shape({
  username: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter a valid email"),
  password: yup.string().min(6).required("Enter a secure passcode"),
})


function Register() {
  const [newUser, setNewUser] = useState(initialRegisterValues);
  const [errors, setErrors] = useState(initialRegisterErrors);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const { push } = useHistory();

  // Begin validation

  //handles changes on sign up form
  const handleSignChange = e => {
    e.persist()
    setNewUser({

      ...newUser,
      [e.target.name]: e.target.value

    })
    validateSignChange(e)
  }
 
  const validateSignChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.type === "checkbox" ? e.target.checked : e.target.value)
      .then(valid => {

        setErrors({

          ...errors,
          [e.target.name]: ""

        });
        console.log(errors)
      })
      .catch(err => {
        console.log("Validate", err)
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        })
      })
  }

  //checks validity
  useEffect(() => {
    formSchema.isValid(newUser).then(valid => {
      setButtonDisabled(!valid);
    })
  }, [newUser]);


  const RegisterSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://essentialismapi.herokuapp.com/api/users/register", newUser)
      .then((res) => {
        console.log(res);
        alert("Success!")
        // localStorage.setItem("token", res.data.payload);
        push("/");
      })
      .catch((err) => {
        console.log(err, "This is the error");
        alert("Sorry, please enter valid credentials")
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
            value={newUser.username}
            onChange={handleSignChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={newUser.password}
            onChange={handleSignChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={newUser.email}
            onChange={handleSignChange}
          />
        </div>

        <button onClick={() => { push('/') }} disabled={buttonDisabled}>Submit</button>      </form>
    </div>
  );
}

export default Register;

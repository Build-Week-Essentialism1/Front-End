import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import styled from "styled-components";
import { Button, Form, FormGroup } from 'reactstrap';
import './App.css'

const Wrapper = styled.div`
  background-color: #e9e9e9;
  border: 0.5px solid black;
  color: #000000;
  border-radius: 10px;
  display: flex;
  margin: 1em 2em;
  align-content: center;
  justify-content: space-around;
`;

// const Button = styled.button`
//   background-color: gray;
//   color: #000000;
//   border-radius: 5px;
//   display: flex;
//   margin-left: 3em;
//   align-content: center;
//   justify-content: space-around;
// `;
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
    <Wrapper>
    <div className="register">
      
      <h1 className="register-title">Essentialism</h1>
      <h2 className="register-subtitle"><em>Do More, With Less</em></h2>
      <Form onSubmit={RegisterSubmit}>
        <FormGroup>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={newUser.username}
            onChange={handleSignChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={newUser.password}
            onChange={handleSignChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={newUser.email}
            onChange={handleSignChange}
          />
        </FormGroup>
         <Button outline color="danger" className="btn btn-block mb-3" disabled={buttonDisabled}>Register</Button>
        </Form>
      
    </div>
  </Wrapper>
  );
}

export default Register;

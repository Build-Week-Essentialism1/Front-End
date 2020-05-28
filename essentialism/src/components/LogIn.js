import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button, Form, FormGroup, } from 'reactstrap';

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
    <Wrapper>
    <div className="login">
      <h1 className="login-title">Essentialism</h1>
      <h2 className="login-subtitle text-left ml-1"><em>Do More, With Less</em></h2>
      <Form onSubmit={LoginSubmit}>
        <FormGroup>
          <label htmlFor="username"></label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={inputChange}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={inputChange}
          />
        </FormGroup>

        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
         <Button outline color="danger" className="btn btn-block mb-3" disabled={buttonDisabled}>Log In</Button>
      </Form>
    </div>
    </Wrapper>
  );
}

export default LogIn;

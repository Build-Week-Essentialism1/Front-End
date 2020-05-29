import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiousWithAuth";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../actions/LoginAction";
import styled from "styled-components";
import { Button, Form, FormGroup } from "reactstrap";

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
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )

      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        console.log("Validate", err);
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

  // form validation useEffect
  useEffect(() => {
    formSchema.isValid(user).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [user]);

  return (
    <Wrapper>
      <div className="login">
        <h1 className="login-title">Essentialism</h1>
        <h2 className="login-subtitle text-left ml-1">
          <em>Do More, With Less</em>
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            props.userLogin(user);
            push("/dashboard");
          }}
        >
          <FormGroup>
            <label htmlFor="username"></label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={user.username}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
            />
          </FormGroup>

          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <Button
            outline
            color="dark"
            className="btn btn-block mb-3"
            disabled={buttonDisabled}
          >
            Log In
          </Button>
        </form>
      </div>
    </Wrapper>
  );
}

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    user: state,
  };
};

export default connect(mapStateToProps, { userLogin })(LogIn);

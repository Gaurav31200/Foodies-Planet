import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../foodPlaces/pages/FoodPlaceForm.css";
import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { authActions } from "../../shared/store/auth-slice";

import "./Auth.css";
export default function Auth() {
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });
  const dispatch = useDispatch();

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    dispatch(authActions.login());
  };
  const switchModeHandler = () => {
    if (!isLoginModal) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginModal((prev) => !prev);
  };
  return (
    <Card className="authentication">
      <h2>{isLoginModal ? "Login" : "SignUp"} Required</h2>
      <hr />
      <form onSubmit={submitFormHandler}>
        {!isLoginModal && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            errorText="Please enter a name"
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
          errorText="Please provide a valid Email!"
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(7)]}
          onInput={inputHandler}
          errorText="Please enter a password more than 7 characters"
        />
        <Button type="submit" disabled={!formState.isValid}>
          {!isLoginModal ? "SIGNUP" : "LOGIN"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginModal ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
}

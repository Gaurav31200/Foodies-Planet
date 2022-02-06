import React from "react";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./FoodPlaceForm.css";

const NewFoodPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        label="Title"
        element="input"
        errorText="Please Enter a Valid Title!"
        placeholder="Please Enter the Title "
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        id="address"
        label="Address"
        element="input"
        errorText="Please Enter a Valid Address!"
        placeholder="Please Enter the Address "
        onInput={inputHandler}
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        errorText="Please Enter a Valid Description(at least 5 characters)!"
        placeholder="Please Enter the Description "
        onInput={inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewFoodPlace;

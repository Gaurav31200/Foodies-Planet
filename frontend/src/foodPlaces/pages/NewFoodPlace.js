import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import "./FoodPlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const NewFoodPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const userId = useSelector((state) => state.auth.userId);
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

  const Navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/foodPlaces",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      Navigate("/");
    } catch (err) {}
  };
  return (
    <>
      {error && <ErrorModal onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
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
          id="description"
          label="Description"
          element="textarea"
          errorText="Please Enter a Valid Description(at least 5 characters)!"
          placeholder="Please Enter the Description "
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
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

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewFoodPlace;

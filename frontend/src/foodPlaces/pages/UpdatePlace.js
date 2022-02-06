import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./FoodPlaceForm.css";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "KC Restaurant",
    description:
      "Fast FoodTypeTake away ,Delivery ServiceKnown forQuick ServiceAverage CostPrice For Two-460Must Orderchicken spring roll,chicken malai momos,chilli paneer",
    imageUrl:
      "https://content.jdmagicbox.com/comp/delhi/w4/011pxx11.xx11.140515192034.e9w4/catalogue/kc-restaurant-dwarka-sector-7-delhi-fast-food-mtk88s1i81.jpg",
    address:
      "Near, Ramphal Chowk Rd, opp. to vandana printers, Block C, Sector 7 Dwarka, Dwarka, New Delhi, Delhi 110075",
    location: {
      lat: 28.5852321,
      lng: 77.0683988,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Malik Chole Bhature",
    description:
      "Street Food ,Pure VegetarianEstablishment TypeTake awayTypeQuick Bite OutletAverage CostPrice For Two-110",
    imageUrl:
      "https://curlytales.com/wp-content/uploads/2017/06/Shiv-Mishthan-Bhandar.jpg",
    address:
      "C-461, PNB Street, Nangloi, Delhi - 110041, Near Main Nangloi Chowk",
    location: {
      lat: 28.6816031,
      lng: 77.065999,
    },
    creator: "u2",
  },
];
export default function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    true
  );

  const updatePlace = DUMMY_PLACES.find((place) => placeId === place.id);

  useEffect(() => {
    if (updatePlace) {
      setFormData(
        {
          title: { value: updatePlace.title, isValid: true },
          description: { value: updatePlace.description, isValid: true },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, updatePlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  if (!updatePlace) {
    return (
      <div className="center">
        <Card>
          <h1>No place Found!</h1>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title."
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid Description(min 5 characters)."
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE
      </Button>
    </form>
  );
}

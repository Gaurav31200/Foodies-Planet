import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button/Button";
import Input from "../../shared/components/FormElements/Input/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";

import "./FoodPlaceForm.css";

export default function UpdatePlace() {
  const placeId = useParams().placeId;
  const [updatedPlace, setUpdatedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      map: { value: "", isValid: false },
    },
    true
  );
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchFoodPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/foodPlaces/${placeId}`
        );

        setFormData(
          {
            title: { value: responseData.place.title, isValid: true },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            },
            map: {
              value: responseData.place.location,
              isValid: true,
            },
          },
          true
        );
        setUpdatedPlace(responseData.place);
        setCoordinates(responseData.place.location);
      } catch (err) {}
    };
    fetchFoodPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/foodPlaces/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          coordinates: coordinates,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      );
      Navigate("/" + userId + "/foodPlaces");
    } catch (err) {}
  };

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const coordinatesHandler = useCallback(
    (coords) => {
      setCoordinates(coords);
      inputHandler("map", null, true);
    },
    [inputHandler]
  );
  const resetMapHandler = () => {
    setCoordinates(null);
    inputHandler("map", null, false);
  };
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (!updatedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h1>No place Found!</h1>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header="Please mark"
        contentClass="modal-content"
        footerClass="modal-actions"
        footer={
          <>
            <Button onClick={resetMapHandler} inverse>
              RESET
            </Button>
            <Button onClick={closeMapHandler} danger>
              CLOSE
            </Button>
          </>
        }
      >
        <div className="map-container">
          <Map
            markPlace={true}
            coords={coordinates}
            updateCoordinates={coordinatesHandler}
            zoom={coordinates ? 15 : 5}
          />
        </div>
      </Modal>
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
        <Input
          id="address"
          type="text"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter the Address "
          initialValue={formState.inputs.address.value}
          initialValid={formState.inputs.address.isValid}
          onInput={inputHandler}
        />
        <div className="map-Button">
          <Button type="button" onClick={openMapHandler}>
            Mark place on Map
          </Button>
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE
        </Button>
      </form>
    </>
  );
}

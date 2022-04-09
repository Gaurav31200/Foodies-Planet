import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/Util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/Image/ImageUpload";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./FoodPlaceForm.css";

const NewFoodPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const [showMap, setShowMap] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
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
      image: {
        value: null,
        isValid: false,
      },
      map: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const Navigate = useNavigate();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // let formData = new FormData();
    // let url;
    // formData.append("file", formState.inputs.image.value);
    // formData.append("upload_preset", "foodPlaces");
    // try {
    //   const res = await sendRequest(
    //     "https://api.cloudinary.com/v1_1/dyqmlqksn/image/upload",
    //     "POST",
    //     formData
    //   );
    //   url = res.url;
    // } catch (err) {
    //   console.log(err);
    // }

    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    // formData.append("url", url);
    formData.append("image", formState.inputs.image.value);
    formData.append("lat", coordinates.lat);
    formData.append("lng", coordinates.lng);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/foodPlaces`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );
      Navigate("/");
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
  return (
    <>
      {error && <ErrorModal onClear={clearError} />}
      {isLoading && <LoadingSpinner asOverlay />}
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
        <div className="map-Button">
          <Button type="button" onClick={openMapHandler}>
            Mark place on Map
          </Button>
        </div>
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please Provide an Image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewFoodPlace;

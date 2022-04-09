import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
  const userId = useParams().userId;
  let [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  useEffect(() => {
    let isMounted = true;
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/foodPlaces/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    if (isMounted) fetchPlaces();
    return () => {
      isMounted = false;
    };
  }, [sendRequest, userId]);

  const deletePlaceHandler = (deleteFoodPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => deleteFoodPlaceId !== place.id)
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList
          userId={userId}
          items={loadedPlaces}
          onDeleteFoodPlace={deletePlaceHandler}
        />
      )}
    </>
  );
};

export default UserPlaces;

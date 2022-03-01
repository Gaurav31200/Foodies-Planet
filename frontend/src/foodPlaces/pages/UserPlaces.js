import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
const UserPlaces = () => {
  const userId = useParams().userId;
  let [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttp([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/foodPlaces/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
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
      {!isLoading && (
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

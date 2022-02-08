const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const getCoordinates = require("../util/location");

let DUMMY_PLACES = [
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
    creator: "u1",
  },
];

const getPlaceById = (req, res) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => placeId === p.id);
  if (!place) {
    throw new HttpError("Couldn't find the place for the provided id. ", 404);
  }
  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);
  if (places.length === 0) {
    return next(
      new HttpError("Couldn't find the place for the provided user id. ", 404)
    );
  }
  res.json({ places });
};

const createFoodPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Please provide appropriate data.", 422));
  }
  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    // console.log(error);
    return next(error);
  }
  const createdFoodPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdFoodPlace);

  res.status(201).json({ place: createdFoodPlace });
};
const updateFoodPlace = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Please provide appropriate data.", 422);
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => placeId === p.id);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;
  res.status(200).json({ place: updatedPlace });
};
const deleteFoodPlace = (req, res) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Couldn't find a place with provided id.", 404);
  }
  console.log(placeId);
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Deleted Food Place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createFoodPlace = createFoodPlace;
exports.updateFoodPlace = updateFoodPlace;
exports.deleteFoodPlace = deleteFoodPlace;

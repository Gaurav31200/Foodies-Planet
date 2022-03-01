const access_token =
  "pk.eyJ1IjoiZ2F1cmF2MzEyIiwiYSI6ImNsMDZkMXdtYTBjYjUza3IyOThuNjloMTkifQ.Ffw3bv9p56F4zWfw50tp1Q";
const axios = require("axios");
const HttpError = require("../models/http-error");

const getCooByAdd = async (address) => {
  const res = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${access_token}`
  );
  const data = res.data;
  if (!data) {
    const error = new HttpError(
      "Could not find the location for the given address!",
      422
    );
    throw error;
  }

  const coordinates = data.features[0].center;
  const lng = coordinates[0];
  const lat = coordinates[1];
  return { lat, lng };
};

module.exports = getCooByAdd;

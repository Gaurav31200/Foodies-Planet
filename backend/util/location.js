const API_KEY = "VYBHE0NPrALVpSGi75W0Dk0onWUpQFA3s9tIVWCE9Fk";
const axios = require("axios");
const HttpError = require("../models/http-error");

const getCooByAdd = async (address) => {
  const response = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
      address
    )}&apikey=${API_KEY}`
  );
  const data = response.data;
  //   console.log(data.items[0].position);
  if (!data) {
    const error = new HttpError(
      "Could not find the location for the given address!",
      422
    );
    throw error;
  }

  const coordinates = data.items[0].position;
  return coordinates;
};

module.exports = getCooByAdd;

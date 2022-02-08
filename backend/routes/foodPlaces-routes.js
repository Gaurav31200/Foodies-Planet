const express = require("express");
const { check } = require("express-validator");
const foodPlacesControllers = require("../controllers/foodPlaces-controllers");

const router = express.Router();

router.get("/:pid", foodPlacesControllers.getPlaceById);

router.get("/user/:uid", foodPlacesControllers.getPlaceByUserId);

router.post(
  "/",
  [
    check("title").notEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").notEmpty(),
  ],
  foodPlacesControllers.createFoodPlace
);

router.patch(
  "/:pid",
  [check("title").notEmpty(), check("description").isLength({ min: 5 })],
  foodPlacesControllers.updateFoodPlace
);

router.delete("/:pid", foodPlacesControllers.deleteFoodPlace);

module.exports = router;

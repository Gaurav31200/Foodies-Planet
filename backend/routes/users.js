const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/users");

const router = express.Router();

router.get("/", usersControllers.getusers);
router.post(
  "/signup",
  [
    check("name").notEmpty(),
    check("email")
      .normalizeEmail() //Test124@gmail.com ==> test124@gmail.com
      .isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usersControllers.signupUser
);
router.post(
  "/login",
  check("email").normalizeEmail().isEmail(),
  usersControllers.loginUser
);
module.exports = router;

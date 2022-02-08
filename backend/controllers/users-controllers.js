const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const USERS = [
  {
    id: "u1",
    name: "Saini",
    email: "saini123@gmail.com",
    password: "gaurav",
  },
];

const getusers = (req, res) => {
  res.json({ users: USERS });
};

const signupUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Please provide appropriate data.", 422);
  }
  const { name, email, password } = req.body;
  const existinguser = USERS.find((u) => u.email === email);
  if (existinguser) {
    throw new HttpError("User already exists!", 422);
  }
  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  USERS.push(newUser);

  res.status(200).json({ newUser });
};

const loginUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Please provide appropriate data.", 422);
  }
  const { email, password } = req.body;
  const user = USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    throw new HttpError(
      "Couldn't identify the user, credentials seems to be wrong!!",
      401
    );
  }
  res.status(200).json({ message: "LoggedIn" });
};

exports.getusers = getusers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;

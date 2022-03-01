const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const user = require("../models/user");

const getusers = async (req, res, next) => {
  let users;
  try {
    users = await user.find({}, "-password");
  } catch (err) {
    return next(
      new HttpError("Couldn't fetch users, Please try again later."),
      500
    );
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signupUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Please provide appropriate data.", 422));
  }
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Couldn't signup, please try again later.", 500));
  }
  if (existingUser) {
    return next(new HttpError("User already exists!", 422));
  }

  const newUser = new user({
    name,
    email,
    password,
    image: req.file.path,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Signing up user failed!!", 500));
  }

  res.status(200).json({ user: newUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Please provide appropriate data.", 422));
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await user.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Couldn't login, please try again later.", 500));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError(
        "Couldn't identify the user, credentials seems to be wrong!!",
        401
      )
    );
  }

  res.status(200).json({
    message: "LoggedIn",
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getusers = getusers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;

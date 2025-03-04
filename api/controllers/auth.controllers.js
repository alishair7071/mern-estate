const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utills/error");

const signUp = async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  try {
    let newUser = await userModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (e) {
      next(e)
    //here we can use our custom errorHandler function which is in the error.js file
    //next(errorHandler(550, "error from the function"));
  }
};

module.exports = { signUp };

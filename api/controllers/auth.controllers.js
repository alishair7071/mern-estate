const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signUp = async (req, res) => {
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
    res.status(500).json(e.message);
  }
};

module.exports = { signUp };

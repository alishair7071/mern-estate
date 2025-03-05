const userModel = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utills/error");
const jwt= require('jsonwebtoken');

const signUp = async (req, res, next) => {
  console.log(req.body);
  try {
  const { userName, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
      
  let newUser = await userModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json(
      {user:newUser,
        message: "user created Successfully"
      });
  } catch (e) {
      next(e)
    //here we can use our custom errorHandler function which is in the error.js file
    //next(errorHandler(550, "error from the function"));
  }
};

const signIn= async (req, res, next)=>{
  console.log(req.body);
   try{
    const {email, password}= req.body;
    const validUser=await userModel.findOne({email: email});
    if(!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword= bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(404, 'Invalid password'));
    const token= jwt.sign({id : validUser._id}, process.env.JWT_SECRET);
    const {password: pass, ...rest}= validUser._doc;
    res.cookie('access_token', token, {httpOnly: true})
    .status(200)
    .json(rest);

   }catch(e){
      next(e);
   }

}



module.exports = { signUp, signIn };

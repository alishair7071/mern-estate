const userModel = require("../models/user.model");
const errorHandler = require("../utills/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
  res.send("hello world!!!!!!!");
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only your own account!"));

  try {
    var hashedPassword=null;
    if (req.body.password) {
      hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedData = {};
    if (req.body.userName) updatedData.userName = req.body.userName;
    if (req.body.email) updatedData.email = req.body.email;
    if (hashedPassword) updatedData.password = hashedPassword;
    if (req.body.avatar) updatedData.avatar = req.body.avatar;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedData,
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

  } catch (e) {
    next(e);
  }
};


const deleteUser= async (req, res, next)=>{

  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can delete only your own account!"));

  try{
    const user = await userModel.findByIdAndDelete(req.user.id);
    res.clearCookie('access_token');
    res.status(200).json({message: 'user deleted Successfully'});

  }catch(e){
      next(e)
  }


}

module.exports = { test, updateUser, deleteUser };

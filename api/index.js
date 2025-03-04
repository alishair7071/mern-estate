const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRouter = require('./routes/user.router');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
};
connectDb();

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});


app.use('/user', userRouter);
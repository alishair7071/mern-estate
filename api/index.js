const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const userRouter = require('./routes/user.router');
const signUpRouter= require('./routes/auth.route');
app.use(express.json());

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
app.use('/auth', signUpRouter);


app.use((err, req, res, next)=>{
    const statusCode= err.statusCode || 500;
    const message= err.message || "Internal Server Error";
    return res.status(statusCode).json({
            success: false,
            statusCode: statusCode,
            message: message,
    });

});
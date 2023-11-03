const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// import User from "./models/User.js";
// import Post from "./models/Post.js";
const AuthRouter = require("./routes/Auth.js");
require("dotenv").config();

//middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

mongoose.connect("mongodb+srv://amazongrp6:amazongrp@cluster0.dbsgjmq.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })
);
app.use(cookieParser());


app.use("/auth", AuthRouter);


app.listen(6001, () => {
  console.log("API working!");
});
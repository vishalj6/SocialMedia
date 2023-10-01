const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = "sadajsbfudfAFSGG";

//middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

mongoose.connect("mongodb+srv://amazongrp6:amazongrp@cluster0.dbsgjmq.mongodb.net/", {}).then(() => console.log("DB connected!")).catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  // id: new mongoose.mongo.ObjectId(),
  // id:{ type: String, required: true ,autoincrement:true},
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String, default: "https://images.pexels.com/lib/avatars/orange.png?w=50&h=50&fit=crop&dpr=1" },
  coverPic: { type: String, default: "" },
  bio: { type: String, max: 160 },
  posts: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
});

const User = mongoose.model("User", UserSchema);

// const PostSchema = new mongoose.Schema({
//   id:{ type: String, required: true ,autoincrement:true},
//   userId: { type: String, required: true },
//   desc: { type: String, max: 500 },
//   img: { type: String },
//   likes: { type: Array, default: [] },
// });



app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true })
);
app.use(cookieParser());

app.post("/register", async (req, res) => {
  const { username, email, password, name } = req.body.inputs;
  const alreadyUser = await User.findOne({ username });
  if (alreadyUser) {
    return res.status(401).json({ errors: "User Already Exist" });
  }
  else {
    // Hash the password using bcrypt
    console.log(password);
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(saltRounds)
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name
    });

    newUser
      .save()
      .then(() => {
        console.log("User saved to MongoDB");
        res.status(201).json({ message: "User created successfully" });
      })
      .catch((error) => {
        console.error("Error saving user to MongoDB:", error);
        res.status(500).json({ error: "An error occurred" });
      });
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body.inputs;
  if (!username || !password) {
    return res.status(401).json({ error: "Uname or Password can't be empty" })
  };
  try {
    const userWithUname = await User.findOne({ username }).catch((err) => console.log("USer not Found", err));
    if (userWithUname) {
      const compare = await bcrypt.compare(password, userWithUname.password);
      if (!compare) {
        return res.status(400).json({ error: "Password Not Matched with Database" });
      }
      else {
        console.log("Password Matched", compare);
        const jwtToken = jwt.sign({ username, id: userWithUname._id }, secret_key);
        return res.status(201).json({ message: "Welcome Back!!", user: userWithUname, token: jwtToken });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: "Uname not Found on Database" });
  }
});


app.listen(6001, () => {
  console.log("API working!");
});
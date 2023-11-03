const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret_key = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
    const { username, email, password, name } = req.body.inputs;
    const alreadyUser = await User.findOne({ username });
    if (alreadyUser) {
        return res.status(401).json({ error: "User Already Exist" });
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

router.post("/login", async (req, res) => {
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

module.exports = router;
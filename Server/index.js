const express = require('express');
const connectdb = require('./Config/dbconnection');
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./routes/users")
require("dotenv").config();
const passport = require("passport");

const app= express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for verifying token
app.use(passport.initialize());
require("./middleware/verifytoken")(passport);



app.use("/auth",users);

// Database Connection
connectdb();

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {

    res.send('This is a Blog Posting Application MERN');
})

app.listen(PORT, ()=> console.log(`Server Started and running on port ${PORT}`));
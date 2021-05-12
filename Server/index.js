const express = require('express');
const connectdb = require('./dbconnection');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();


const app= express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
connectdb();

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {

    res.send('This is a Blog Posting Application MERN');
})

app.listen(PORT, ()=> console.log("Server Started and running on port ${PORT}"));
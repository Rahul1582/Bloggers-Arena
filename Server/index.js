const express = require('express');
const connectdb = require('./dbconnection');


const app= express();

connectdb();

const PORT = process.env.PORT || 8000;

app.get('/', (req,res) => {

    res.send('This is a Blog Posting Application MERN');
})

app.listen(port, ()=> console.log("Server Stated"));
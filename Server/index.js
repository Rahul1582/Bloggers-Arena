const express = require('express');
const connectdb = require('./dbconnection');


const app= express();

connectdb();

const port = process.env.port || 8000;

app.listen(port, ()=> console.log("Server Stated"));

app.get('/', (req,res) => {

    res.send('This is a Blog Posting Application MERN');
})
const mongoose = require("mongoose");

const connect = "mongodb+srv://rkp_blog:rkp_blog@cluster0.v6mg9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectdb = async ()=>{

   await mongoose.connect(connect , {    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true});
   
    console.log('Database Connected ..')
}

module.exports = connectdb;


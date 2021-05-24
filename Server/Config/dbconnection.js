const mongoose = require("mongoose");

const connect = "mongodb+srv://rkp_blog:rkp_blog@cluster0.v6mg9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectdb = async ()=>{

    await mongoose.connect(connect , {    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true})
   
    .then(() => {
        console.log("Connected with the Database");
      })
      .catch(error => {
        console.log(error, "Not Connected with the Database ");
 });
}

module.exports = connectdb;


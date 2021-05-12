
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema({
   title: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   },
   author: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      required: true,
      default: Date.now
   }
});

module.exports = mongoose.model("posts", post);
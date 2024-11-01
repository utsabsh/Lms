const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  password: String,
  role: String,
});
module.exports = mongoose.model("User", Userschema);

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: [true, 'Please specify a username'] },
  password: { type: String, required: [true, 'A password is needed'] },
  level: { type: String, required: [true, 'We need to know your pool level'] },
  avatar: String,
  tournaments: String,
  favoriteCenter: String,
  orientation: String,
  gamesWon: Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;

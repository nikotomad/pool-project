const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const centerSchema = new Schema({
  name: String,
  address: String,
  tables: Number,
  size: String,
  latitude: Number,
  longitude: Number,
  phone: Number
  //photos: []
  //timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Center= mongoose.model("Center", centerSchema);

module.exports = Center;

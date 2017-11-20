const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: String,
  level: String,
  participants: String,
  tournaments: String,
  startDate: Date,
  endingDate: Date,
  winner: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  //timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;

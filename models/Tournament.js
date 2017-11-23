const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: String,
  level: String,
  maxParticipants: Number,
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  startDate: Date,
  endingDate: Date,
  winner: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;

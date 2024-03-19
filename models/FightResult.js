const mongoose = require("mongoose");
const fightResultData = new mongoose.Schema({
  player: String,
  winer: String,
  loser: String,
  point: String,
  fightNumber: Number,
});

const FightResult = mongoose.model("FightResult", fightResultData);

module.exports = FightResult;

const mongoose = require("mongoose");
const fightResultSchema = new mongoose.Schema({
  winer: String,
  loser: String,
  point: String,
});

const FightResult = mongoose.model("FightResult", fightResultSchema);

module.exports = FightResult;

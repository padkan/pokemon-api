const FightResult = require("../models/FightResult");

exports.createFightResult = async (req, res) => {
  const { winer, loser } = req.body;

  try {
    const fightResultByWiner = await FightResult.findOne({ winer });
    let fightResult;
    let fightResultUpdate;
    if (fightResultByWiner == null) {
      fightResult = await FightResult.create({ winer, loser, point: 1 });
      fightResult = await fightResult.save();
      //console.log("fightResult1", fightResult);
    } else {
      const point = Number(fightResultByWiner.point) + 1;
      fightResultUpdate = await FightResult.findOneAndUpdate(
        { winer },
        { $set: { point } },
        { new: true }
      );
      //console.log("fightResultUpdate", fightResultUpdate);
    }
    //console.log("fightResult2", fightResult);
    const data =
      typeof fightResult === "undefined"
        ? { fightResultUpdate }
        : { fightResult };
    res.status(201).json({
      message: "fightResult created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFightResult = async (req, res) => {
  try {
    const fightResult = await FightResult.find();
    console.log("fightResult", fightResult);
    res.status(201).json({ data: fightResult });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while get fightResults" });
  }
};

exports.updateFightResult = async (req, res) => {
  try {
    const { id } = req.params;
    let { player, winner, loser, point } = req.body;
    const fightResult = await FightResult.find({ player });
    if (!fightResult) {
      res.status(404).json({
        message: "I don't know this fightResult",
      });
    } else {
      point = fightResult.point + Number(point);
      const fightNumber = ++fightResult.fightNumber;
      const fightResultUpdate = await FightResult.findByIdAndUpdate(
        fightResult.id,
        {
          winner,
          loser,
          point,
          fightNumber,
        },
        {
          new: true,
        }
      );
      if (!fightResultUpdate) {
        res.status(404).json({
          message: "I don't know this fightResultUpdate",
        });
      } else {
        res.status(200).json({
          message: "fightResultUpdate updated successfully",
          data: fightResultUpdate,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while get fightResults" });
  }
};

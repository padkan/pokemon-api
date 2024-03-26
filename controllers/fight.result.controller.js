const FightResult = require("../models/FightResult");

exports.createFightResult = async (req, res) => {
  const { winer, loser, point } = req.body;

  try {
    const fightResult = await FightResult.create({ winer, loser, point });

    res.status(201).json({
      message: "fightResult created successfully",
      data: fightResult,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the fightResult" });
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

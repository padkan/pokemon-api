const FightResult = require("../model/FightResult");

exports.createFightResult = async (req, res) => {
  const { winner, loser, point, player } = req.body;
  try {
    const fightResult = new FightResult({
      player,
      winner,
      loser,
      point,
      fightNumber: 0,
    });
    const savedFightResult = await fightResult.create();
    res.status(201).json({
      message: "fightResult created successfully",
      data: savedFightResult,
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

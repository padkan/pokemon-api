const express = require("express");
const api = express.Router();
const {
  getAllFightResult,
  createFightResult,
  updateFightResult,
} = require("../controllers/fight.result.controller");

api.route("/fight-result").get(getAllFightResult).post(createFightResult);
api.route("/fight-result:plyer").get(updateFightResult);

module.exports = api;

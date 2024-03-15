const express = require("express");
const api = express.Router();
const {
  getAllFightResult,
  createFightResult,
  updateFightResult,
} = require("../controller/pokemon.controller");

api.route("/fight-result").get(getAllFightResult).post(createFightResult);
api.route("/:plyer").get(updateFightResult);

module.exports = api;

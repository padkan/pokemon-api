const express = require("express");
const api = express.Router();
const {
  getAllPokemon,
  getPokemon,
} = require("../controllers/pokemon.controller");

api.route("/pokemons").get(getAllPokemon);

api.route("/pokemons/:id").get(getPokemon);
module.exports = api;

const jsonData = require("../file.json");

const getAll = () => {
  const pokemons = jsonData;
  return pokemons;
};
const getById = (id) => {
  const pokemon = jsonData.filter((item) => item.id == id);
  return pokemon;
};
module.exports = { getAll, getById };

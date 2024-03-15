const express = require("express");
const cors = require("cors");
const connectDB = require("./dbinit");
const dotenv = require("dotenv");
const jsonData = require("./file.json");
const api = require("./routes/pokemon.router");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

//use CORS

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(api);

// init db
connectDB();

app.get("/pokemon", (req, res) => {
  console.log("pokemon");
  return res.json(jsonData).status(200);
});

app.get("/pokemon/:id", (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const pokemon = jsonData.filter((item) => item.id == id);
  return res.json(pokemon).status(200);
});

app.get("/pokemon/:id/:info ", (req, res) => {
  console.log("info");
  //   const { id, info } = req.params;
  //   console.log("info", info);
  //   const pokemon = jsonData.filter((item) => item.id == id);
  //   return res.json(pokemon[info]).status(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

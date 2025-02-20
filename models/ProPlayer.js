const mongoose = require("mongoose");

const ProPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  team: { type: String, required: true },
  history: { type: String, required: true },
  sensi: { type: String, required: true },
});

const ProPlayer = mongoose.model("ProPlayer", ProPlayerSchema);

module.exports = ProPlayer;

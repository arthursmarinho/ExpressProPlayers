// models/savedPlayer.js
const mongoose = require("mongoose");

const savedPlayerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  playerName: { type: String, required: true },
  game: { type: String, required: true },
  team: { type: String, required: true },
  stats: { type: Object, required: true }
});

const SavedPlayer = mongoose.model("SavedPlayer", savedPlayerSchema);

module.exports = SavedPlayer; // Certifique-se de que está exportando o modelo corretamente

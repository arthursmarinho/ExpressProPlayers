const mongoose = require("mongoose");

const TeamsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birth: { type: Number, required: true },
  image: { type: String, required: true },
  history: { type: String, required: true }
});

const Teams = mongoose.model("Teams", TeamsSchema);

module.exports = Teams;
  
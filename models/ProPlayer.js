const mongoose = require("mongoose");

const ProPlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
  team: { type: String, required: true },
});

module.exports = mongoose.model("ProPlayer", ProPlayerSchema);

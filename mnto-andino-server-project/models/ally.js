const mongoose = require("mongoose");

const allySchema = new mongoose.Schema({
  allyName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  national: {
    type: Boolean,
    default: true,
  },
});

const Ally = mongoose.model("Ally", allySchema);
module.exports = Ally;

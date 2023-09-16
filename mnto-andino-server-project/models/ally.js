// clientModel.js
const mongoose = require("mongoose");

const allySchema = new mongoose.Schema({
  allyName: {
    type: String,
    required: true,
  },
  direccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  avatar: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Ally = mongoose.model("Ally", allySchema);
module.exports = Ally;

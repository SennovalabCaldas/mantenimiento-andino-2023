// clientModel.js
const mongoose = require("mongoose");

const FoundationSchema = new mongoose.Schema({
  foundationName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  direccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

const Foundation = mongoose.model("Foundation", FoundationSchema);
module.exports = Foundation;

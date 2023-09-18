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
  active: {
    type: Boolean,
    default: true,
  },
});

const Foundation = mongoose.model("Foundation", FoundationSchema);
module.exports = Foundation;

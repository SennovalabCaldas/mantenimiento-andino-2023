// clientModel.js
const mongoose = require("mongoose");

const FoundationSchema = new mongoose.Schema({
  images: [
    {
      type: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Foundation = mongoose.model("Foundation", FoundationSchema);

module.exports = Foundation;

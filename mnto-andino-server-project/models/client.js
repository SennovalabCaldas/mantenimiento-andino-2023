// clientModel.js
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  national: {
    type: Boolean,
    required: true,
  },
  state: {
    type: String,
  },
  avatar: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

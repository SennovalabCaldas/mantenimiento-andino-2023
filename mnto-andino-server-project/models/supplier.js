// clientModel.js
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
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

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;

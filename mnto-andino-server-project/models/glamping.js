// clientModel.js
const mongoose = require("mongoose");

const glampingSchema = new mongoose.Schema({
  serviceName: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Valor por defecto: la fecha actual al momento de creación
  },
});

const Glamping = mongoose.model("Glamping", glampingSchema);
module.exports = Glamping;

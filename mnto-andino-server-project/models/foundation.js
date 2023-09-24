// clientModel.js
const mongoose = require("mongoose");

const FoundationSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String, // Guardaremos la URL de la imagen en la base de datos
  },
  active: {
    type: Boolean, 
    default: true, // Valor por defecto: true
  },
  createdAt: {
    type: Date,
    default: Date.now, // Valor por defecto: la fecha actual al momento de creación
  },
});

const Foundation = mongoose.model("Foundation", FoundationSchema);
module.exports = Foundation;

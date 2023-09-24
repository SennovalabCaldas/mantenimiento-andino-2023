// clientModel.js
const mongoose = require("mongoose");

const makinaAndinaSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  photos: [
    {
      type: String, // Guardaremos la URL de la imagen en la base de datos
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now, // Valor por defecto: la fecha actual al momento de creación
  },
});

const MakinaAndina = mongoose.model("MakinaAndina", makinaAndinaSchema);
module.exports = MakinaAndina;

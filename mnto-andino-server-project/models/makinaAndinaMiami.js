// clientModel.js
const mongoose = require("mongoose");

const makinaAndinaMiamiSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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

const MakinaAndinaMiami = mongoose.model("MakinaAndinaMiami", makinaAndinaMiamiSchema);
module.exports = MakinaAndinaMiami;

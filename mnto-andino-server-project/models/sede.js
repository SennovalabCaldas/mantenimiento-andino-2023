const mongoose = require("mongoose");

const SedeSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  direccion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

module.exports = mongoose.model("Sede", SedeSchema);

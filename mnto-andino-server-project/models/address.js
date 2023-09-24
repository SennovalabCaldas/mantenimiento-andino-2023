const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  municipio: {
    type: String,
    required: true,
  },
  selectedStreet: {
    type: String,
    required: true,
  },
  nomenclature: {
    type: String,
    required: true,
  },
  barrio: {
    type: String,
  },
});

module.exports = mongoose.model("Address", AddressSchema);

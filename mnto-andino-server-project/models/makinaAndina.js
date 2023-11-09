// clientModel.js
const mongoose = require("mongoose");

const makinaAndinaSchema = new mongoose.Schema({
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
      type: String,
    },
  ],

});

const MakinaAndina = mongoose.model("MakinaAndina", makinaAndinaSchema);
module.exports = MakinaAndina;

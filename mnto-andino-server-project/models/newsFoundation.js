// clientModel.js
const mongoose = require("mongoose");

const newsFoundationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
});

const NewsFoundation = mongoose.model("NewsFoundation", newsFoundationSchema);
module.exports = NewsFoundation;

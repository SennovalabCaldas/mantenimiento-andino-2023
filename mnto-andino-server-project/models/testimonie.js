const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testimonioSchema = new Schema({
  client: {
    type: String,
  },
  role: {
    type: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  evaluation: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Testimonio = mongoose.model('Testimonio', testimonioSchema);
module.exports = Testimonio;

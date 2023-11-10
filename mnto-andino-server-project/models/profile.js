const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  profileName: String,
  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  contact_telephone: String,
  email: String,
  contact_whatsApp: String,
  active: Boolean,
});

module.exports = mongoose.model("Profile", ProfileSchema);

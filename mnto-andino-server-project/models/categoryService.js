const mongoose = require("mongoose");

const categoryServiceSchema = new mongoose.Schema({
  nameCategoryService: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
  },
});

const CategoryService = mongoose.model(
  "CategoryService",
  categoryServiceSchema
);

module.exports = CategoryService;

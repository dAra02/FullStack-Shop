const mongoose = require("mongoose");
const roles = require("../constants/roles");
const validator = require("validator");

const TovarSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: validator.isURL,
  },
  categor: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Tovar = mongoose.model("Tovar", TovarSchema);

module.exports = Tovar;

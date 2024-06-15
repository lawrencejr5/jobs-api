const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    minlength: 3,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
mongoose.export = userModel;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({});

const userModel = mongoose.model("User", userSchema);
mongoose.export = userModel;

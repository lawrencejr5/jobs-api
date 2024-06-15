const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({});

const jobModel = mongoose.model("Job", jobSchema);
mongoose.export = jobModel;

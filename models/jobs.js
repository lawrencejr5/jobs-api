const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Position can not be empty"],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Provide user"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model("Job", jobSchema);
mongoose.export = jobModel;

const express = require("express");
const jobsRouter = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.get("/:id", getJob);
jobsRouter.post("/", createJob);
jobsRouter.patch("/:id", updateJob);
jobsRouter.delete("/:id", deleteJob);

module.exports = jobsRouter;

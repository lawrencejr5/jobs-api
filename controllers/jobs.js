const Job = require("../models/jobs");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ msg: "success", rowCount: jobs.length, jobs });
  } catch (error) {
    console.log(error);
  }
};
const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const job = await Job.findOne({ _id: id, createdBy: userId });
    if (!job)
      return res
        .status(404)
        .json({ msg: `The job with id ${id} was not found` });
    res.status(200).json({ msg: "success", job });
  } catch (error) {
    console.log(error);
  }
};
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(200).json({ msg: "created", job });
  } catch (error) {
    console.log(error);
  }
};
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const job = await Job.deleteOne({ _id: id, createdBy: userId });
    if (!job)
      return res
        .status(404)
        .json({ msg: `The job with id ${id} was not found` });
    res.status(200).json({ msg: "deleted", id, job });
  } catch (error) {
    console.log(error);
  }
};
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const job = await Job.findOneAndUpdate(
      { _id: id, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job)
      return res
        .status(404)
        .json({ msg: `The job with id ${id} was not found` });
    res.status(200).json({ msg: "updated", job });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };

require("dotenv").config();

const express = require("express");
const app = express();

const ConnectDb = require("./db/conn");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/user");

app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

const statrtServer = async () => {
  const port = process.env.PORT || 5000;
  const url = process.env.MONGO_URI;
  try {
    await ConnectDb(url);
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
statrtServer();

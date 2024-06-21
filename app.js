require("dotenv").config();

const express = require("express");
const app = express();

// Security packages
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const ConnectDb = require("./db/conn");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/user");
const auth = require("./middlewares/auth");

const notFound = require("./middlewares/not-found");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());
app.use(helmet());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.use(notFound);

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

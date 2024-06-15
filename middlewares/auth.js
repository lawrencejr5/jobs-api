const auth = (req, res, next) => {
  res.send("auth");
  next();
};
module.exports = auth;

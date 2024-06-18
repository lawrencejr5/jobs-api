const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(401).json({ msg: "Unauthenticated" });

  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { ...payload };
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(500).json({ msg: "Internal server err" });
  }
};
module.exports = auth;

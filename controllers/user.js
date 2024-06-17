const User = require("../models/user");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // const tmpUser = { name, email, password: hashedPassword };
    // const user = await User.create({ ...tmpUser });

    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(200).json({ msg: "success", user: user.name, token });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ msg: "Email not valid, go and create an account" });

    const passwordMatch = await user.comparePass(password);
    if (!passwordMatch)
      return res.status(401).json({ msg: "Password not correct" });

    const token = user.createJWT();
    res.status(201).json({ msg: "authenticated", user: user.name, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };

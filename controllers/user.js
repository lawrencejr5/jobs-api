const register = async (req, res) => {
  try {
    res.send("bankai");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    res.send("bankai");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {register, login}
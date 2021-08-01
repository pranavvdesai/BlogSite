// sign in and get a jwt token for first time

const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.loginvalidation = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      res.status(422).json({ message: "Invalid credentials" });
    }
    return res.json(200, {
      message: "sign in suxas, here is ur token, keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "pronob", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const gravatar = require("gravatar");

const getAuthController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const b = req.body;
  try {
    // SEE IF USER EXISTS
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        errors: [
          {
            msg: "INVALID CREDENTIALS",
          },
        ],
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
    } // RETURN JWT TOKEN
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, payload, user, email, password, b });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const registerController = async (req, res) => {
  console.log("inside register controller");
  const { name, email, password } = req.body;

  try {
    // SEE IF USER EXISTS
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        errors: [
          {
            msg: "user already exist",
          },
        ],
      });
    // GET USERS GRAVATAR
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    user = new User({
      name,
      email,
      avatar,
      password,
    });
    // ENCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // RETURN JSONWEBTOKEN

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtToken"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  loginController,
  getAuthController,
  registerController,
};

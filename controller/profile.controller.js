const Profile = require("../models/Profile");
const User = require("../models/User");

const getProfile = (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: "THERE IS NO PROFILE FOR THIS USER" });
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("SERVER ERROR");
  }
};

module.exports = {
  getProfile
}

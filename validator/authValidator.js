const { check, validationResult } = require("express-validator");

const loginValidator = [
  check("email", "please include a valid email").isEmail(),
  check("password", "PASSWORD IS REQUIRED").exists(),
  (req, res, next) => {
    console.log("handlining validation inside login");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const registerValidator = [
  check("name", "Name is required")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 1 })
    .escape(),
  check("email", "please include a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters")
    .escape()
    .isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  registerValidator,
  loginValidator,
};

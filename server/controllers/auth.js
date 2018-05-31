const jwt = require("jsonwebtoken");
const config = require("../config");

const createAuthToken = user => {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.email,
    expiresIn: config.JWT_EXPIRY,
    algorithm: "HS256"
  });
};

exports.login = function(req, res, next) {
  const authToken = createAuthToken(req.user.apiRepr());
  res.json({ authToken });
};

exports.refresh = function(req, res, next) {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
};

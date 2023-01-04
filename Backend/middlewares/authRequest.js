const jwt = require("jsonwebtoken");

const authRequest = (req, res, next) => {
  //⚠ Send token from the frontend with the same name
  const token = req.header("authToken");
  try {
    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    req.user = userInfo.user;
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};


module.exports = authRequest;

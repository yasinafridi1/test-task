const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const { accesstoken } = req.cookies;
    console.log(accesstoken);
    if (!accesstoken) {
      throw new Error("Please login first");
    }
    const userData = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
    if (!userData) {
      throw new Error("No user found");
    }
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = auth;

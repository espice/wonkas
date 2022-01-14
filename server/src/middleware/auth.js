const jwt = require("jsonwebtoken")

function auth(req, res, next) {
  const token = req.cookies.token;
  console.log(token);

  if (token == undefined) {
    console.log("here");
    return res.json({ success: false, message: "Token not provided" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res.send({ success: false, message: "Invalid Token" });
  }
}

module.exports = auth;

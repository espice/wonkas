const User = require("@models/user");

async function managerOnly(req, res, next) {
  const user = await User.findById(req.user.id);

  if (user.isManager) {
    req.user = user;
    next();
  } else {
    res.send({ success: false, message: "Unauthorised" });
  }
}

module.exports = managerOnly;

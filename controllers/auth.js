const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

const isAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace(/"/g, "").split(" ")[1];
    console.log("token in authcontroller", token);

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const member = await Member.findOne({
          email: decoded.member.email,
        }).exec();
        if (member) {
          req.member = decoded.member;
          next();
        } else {
          res.status(403).send("Forbidden");
        }
      } catch (error) {
        res.status(401).send("Invalid token");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  isAuth,
};

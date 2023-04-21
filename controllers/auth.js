const jwt = require("jsonwebtoken");
const Member = require("../models/Member");

// const isAuth = async (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.replace(/"/g, "").split(" ")[1];
//     console.log("token in authcontroller", token);

//     if (token) {
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const member = await Member.findOne({
//           email: decoded.member.email,
//         }).exec();
//         if (member) {
//           req.member = decoded.member;
//           next();
//         } else {
//           res.status(403).send("Forbidden");
//         }
//       } catch (error) {
//         res.status(401).send("Invalid token");
//       }
//     } else {
//       res.status(401).send("Unauthorized");
//     }
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// };

const isAuth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (decoded.role === "admin") {
      next();
    } else {
      throw new Error("Not authorized as admin");
    }
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = {
  isAuth,
};

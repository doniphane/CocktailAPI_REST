const jwt = require("jsonwebtoken");
require("dotenv").config(); 

const SECRET = process.env.JWT_SECRET; 

const verifyAndDecodeToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token manquant.");
  }

  try {
    const decodedToken = jwt.verify(token, SECRET);

    req.decodedToken = decodedToken;

    next();
  } catch (error) {
    return res.status(403).send("Token invalide.");
  }
};

module.exports = verifyAndDecodeToken;

const jwt = require("jsonwebtoken");
const { senhaJWT } = require("../variaveis/variaveis");

const auth = (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(403).json({ msg: `token inválido` });
    
  }

  const verifytoken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(verifytoken, senhaJWT);

    req.user = { ...decodedToken };

    next();
  } catch (error) {
    res.status(401).json({ msg: `Token Inválido` });
  }
};

module.exports = auth;

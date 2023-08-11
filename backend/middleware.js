const jwt = require("jsonwebtoken");

const key = process.env.KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  jwt.verify(token, key, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "forbidden" });
    }
    req.user = decoded;
    next();
  });
}
module.exports = { verifyToken };

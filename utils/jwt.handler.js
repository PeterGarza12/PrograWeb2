const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../consts.json');

const signToken = async (user) => {
  const signToken = await jwt.sign({
    id: user._id,
    role: user.role,
  },JWT_SECRET, {
    expiresIn:"2h"
  } );
  return signToken;
};
const verifyToken = async (tokenJwt) => {
    try {
      return jwt.verify(tokenJwt, JWT_SECRET);
    } catch (e) {
      return null;
    }
};

module.exports = { signToken, verifyToken };

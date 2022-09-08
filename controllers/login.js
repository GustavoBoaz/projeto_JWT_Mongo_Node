const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'a40b4413c25e179d978340ee7cce3113';

module.exports = async (req, res) => {
  const username = req.body.username;
  const passwordReq = req.body.password;

  if (!username || !passwordReq) return res.send(401);

  const model = new User();
  
  const user = await model.findUserByName(username);

  if (!user) return res.status(401).json(false);

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };

  const { password, ...userWithoutPassword } = user

  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

  res.status(200).json({ token });
};

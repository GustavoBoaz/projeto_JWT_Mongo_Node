const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const segredo = 'a40b4413c25e179d978340ee7cce3113';

module.exports = async (req, res, next) => {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    const model = new User();
  
    const user = await model.findUserByName(decoded.data.username);

    if (!user) {
      res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido.' });
  }
};
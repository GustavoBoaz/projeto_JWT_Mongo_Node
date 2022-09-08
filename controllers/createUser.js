const User = require('../models/user');

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.send(401);

  const model = new User();
  
  const user = await model.createUser(username, password);

  if(!user) return res.status(500).send('Erro ao salvar o usuário no banco', err);

  return res.status(201).json({ message: 'Novo usuário', data: user.ops[0] });
};

const { verify } = require('jsonwebtoken');
const { findBymail } = require('../../routes/user/controllers');
// TODO HASHEO DE CONTRASEÑA
// const { hash } = require('bcrypt');

const changePasswordByToken = async (token, password) => {
  const { email } = verify(token, process.env.SECRET);

  const userUpdate = await findBymail(email);
  userUpdate.password = password;
  await userUpdate.save();

  return '<h1>Tu contraseña ha sido actualizada.</h1>';
};

module.exports = { changePasswordByToken };

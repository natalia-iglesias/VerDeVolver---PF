const { verify } = require('jsonwebtoken');
const { hash } = require('bcrypt');
const { QueryTypes } = require('sequelize');

const { conn } = require('../../db');

const changePasswordByToken = async (token, password) => {
  console.log('changePasswordByToken', token);
  const { email } = verify(token, process.env.SECRET);
  const emailObj = { mail: email };
  console.log('eeeeeeeeeeeeeeeeee', emailObj);
  await conn.query(
    `UPDATE Users SET password='${await hash(password, 8)}' WHERE mail = :mail`,
    {
      replacements: emailObj,
      type: QueryTypes.UPDATE,
    }
  );

  return '<h1>Tu contraseña ha sido actualizada.</h1>';
};

module.exports = { changePasswordByToken };

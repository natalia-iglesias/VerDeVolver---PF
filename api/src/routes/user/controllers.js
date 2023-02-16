const { Role, User } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbUsers() {
  /* const role = await Role.findByPk(1);
  console.log('role:', role); */

  const bulkCreateUsers = await User.bulkCreate([
    {  name: "Nathan", last_name: "Sebhastian", mail:"seb@mail.com", password:"12345", address:"calle 10", /* RoleId:1  */},
    {  name: "Jack", last_name: "Stark", mail:"jack@mail.com", password:"12345", address:"calle 20", /* RoleId:1 */ },
    {  name: "John", last_name: "Snow", mail:"john@mail.com", password:"12345", address:"calle 30", /* RoleId:1 */ },
    {  name: "Marco", last_name: "Polo", mail:"marco@mail.com", password:"12345", address:"calle 40", /* RoleId:1 */ },
  ]);

  return bulkCreateUsers;
}

module.exports = {
  chargeDbUsers,
};

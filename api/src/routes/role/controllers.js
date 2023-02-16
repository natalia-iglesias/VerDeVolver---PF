// aca logica
const { Role } = require('../../db.js');

async function chargeDbRoles() {
  const bulkCreateRoles = await Role.bulkCreate([
    { name: 'User' },
    { name: 'Admin' },
  ]);

  return bulkCreateRoles;
}

module.exports = {
  chargeDbRoles,
};

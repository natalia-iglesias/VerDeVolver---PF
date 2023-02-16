// aca logica
const { Material } = require('../../db.js');

async function chargeDbMaterial() {
  const bulkCreateMaterial = await Material.bulkCreate([
    { name: 'Madera' },
    { name: 'Vidrio' },
    { name: 'Papel' },
    { name: 'Plastico' },
    { name: 'Chapa' },
    { name: 'Hierro' },
  ]);

  return bulkCreateMaterial;
}

module.exports = {
  chargeDbMaterial,
};

const { Material } = require('../../db.js');


const createMaterial = async (body) => {
  const { name, VdVId } = body;

  try {
    const newMaterial = await Material.create({
      name: name,
      VdVId: VdVId,
    });

    await newMaterial.addVdV(VdVId, { through: { selfGranted: false } });

    return newMaterial;
  } catch (error) {
    throw Error('Ocurrio un error. No fue posible procesar la peticion');
  }
};

const crearMaterialFinal = async (body) => {
  const { name } = body;
  const material = await Material.create({
    name,
  });
  return material;
};

const getAllMaterials = async () => {
  const allMaterials = await Material.findAll();
  console.log(allMaterials);
  return allMaterials;
};

const deleteMaterial = async (name) => {
  const material = await Material.destroy({
    where: { name: name },
  });
  return material;
};

const chargeDbMaterial = async () => {
  const bulkCreateMaterial = await Material.bulkCreate([
    { name: 'Madera' },
    { name: 'Vidrio' },
    { name: 'Papel' },
    { name: 'Plastico' },
    { name: 'Chapa' },
    { name: 'Hierro' },
  ]);

  return bulkCreateMaterial;
};

module.exports = {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
  crearMaterialFinal,
  chargeDbMaterial,
};

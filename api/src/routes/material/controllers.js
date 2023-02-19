const { Material } = require('../../db.js');

//FUNCIONA. CREA LA RELACION CON LA VDV. AL HACER GET EN VDV, TE TRAE LAS VDVS CON LOS MATERIALES CREADOS
//...USANDO ESTA RUTA DE CREACION
// !!! El problema es que hay que agregar los materiales de a uno. Asi como se agregaban las actividades 
//...en el PI de countries !!
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
    throw Error ('Ocurrio un error. No fue posible procesar la peticion'); 
  }
};

//FUNCIONA. NO TE TRAE EL ID, SOLO LOS NOMBRES EN UN ARRAY, SE REPITEN NOMBRES PORQUE CADA CREACION DE 
//...DE MATERIAL CON UNA ENTIDAD TIENE UN ID ESPECIFICO COMO EN EL PI DE COUNTRIES
const getAllMaterials = async () => {
  const allMaterials = await Material.findAll();
  const allMaterialsReturn = allMaterials.map((elem) => elem.name);
  return allMaterialsReturn;
};

//NO LO PROBE, NO SE SI FUNCIONA 
const deleteMaterial = async (name) => {
  const material = await Material.destroy({
    where: { name: name },
  });
  return material;
};

//NO FUNCIONA BULKCREATE DE MATERIALES 
/* const chargeDbMaterial = async () => {
      const bulkCreateMaterial = await Material.bulkCreate([
        { name: 'Madera' },
        { name: 'Vidrio' },
        { name: 'Papel' },
        { name: 'Plastico' },
        { name: 'Chapa' },
        { name: 'Hierro' },
      ]);

      return bulkCreateMaterial;
} */

module.exports = {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
};

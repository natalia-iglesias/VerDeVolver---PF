const { VdV, Material } = require('../../db.js');

//FUNCIONA. ESTE ES EL BULKCREATE 
async function chargeDbVdVs() {
  const bulkCreateVdvs = await VdV.bulkCreate([
    {  name: "Reciclar Ayuda", img: "www.imagen.com", mail:"ra@mail.com", /* password:"12345", */ address:"calle 1", description:"Somos una ONG sin fines de lucro", CBU:"34567898777"},
    {  name: "Juntos X el Cambio", img: "www.imagen.com", mail:"jxec@mail.com", /* password:"12345", */ address:"calle 2", description:"Somos una ONG sin fines de lucro", CBU:"23456788777"},
    {  name: "Te Amo Mundo", img: "www.imagen.com", mail:"tam@mail.com", /* password:"12345", */ address:"calle 3", description:"Somos una ONG sin fines de lucro", CBU:"0987698777"},
    {  name: "Salvando el Planeta", img: "www.imagen.com", mail:"sep@mail.com", /* password:"12345", */ address:"calle 4", description:"Somos una ONG sin fines de lucro", CBU:"8976557898777"},
  ]);

  return bulkCreateVdvs;
}; 

//FUNCIONA. No agrega la password porque dijeron pa ponerlo en ruta de cambio de status de vdv
//La password queda en null
const vdvCreate = async (body) => {
  const { name, img, description, mail, /* password, */ address, CBU } = body;
  try {
    if (!name || !img || !description || !mail || !address) throw Error(
      'Debes completar todos los campos obligatorios'
      );
    const vdvCreate = await VdV.create({
      name,
      img,
      mail,
     /*  password, */
      address,
      description,
      CBU,
    });

    return vdvCreate;

  } catch (error) {
    throw Error ('Ocurrio un error. No se pudo crear la entidad');
  }
};

//FUNCIONA. TRAE LAS ENTIDADES CON SUS MATERIALES ASOCIADOS
const getVdV = async () => {
  try {
    const allVdV = await VdV.findAll({
      include: {
        model: Material,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
     return allVdV;

  } catch (error) {
    throw Error('Ocurrio un error al momento de cargar tu peticion de entidades');
  }
};

//FUNCIONA
const getByIdVdV = async (id) => {
  const VdVFind = await VdV.findByPk(id, {
    include: {
      model: Material,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
  return VdVFind;
};

//FUNCIONA. RETORNA LOS CAMBIOS HECHOS
const upDateVdV = async (id, body) => {
  await VdV.update(body, {
    where: { id },
  });
  const result = await getByIdVdV(id);
  return result;
};

//FUNCIONA
const deleteVdV = (id) => {
  const VdVdelete = VdV.destroy({
    where: {
      id,
    },
  });
  return VdVdelete;
};

// FUNCIONA. Implemente creacion de contrasena provisoria. Fijense si les parece bien 
// No se como se pueden generar contrasenas seguras aleatorias, de momento lo estableci con un string fijo
const changeStatus = async (id) => {
  // Hay que invertir los valores cuando ya este el Admin funcionando
    await VdV.update(
      { status: 'Pending', password:'!dfg863234'}, 
      { where: { id } }); 

    const result = await getByIdVdV(id);
    return result;
};

module.exports = {
  chargeDbVdVs,
  vdvCreate,
  getVdV,
  getByIdVdV,
  upDateVdV,
  deleteVdV,
  changeStatus,
};

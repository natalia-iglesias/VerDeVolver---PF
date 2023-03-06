const { VdV, Role } = require('../../db.js');

const findVdv = async (mail) => {
  if(!mail) throw Error('Debes ingresar un mail'); 

  const entidad = await VdV.findOne({
      where: { mail },
      include: [
        {
          model: Role,
          attributes: ['name'],
        },
      ],
  });
  
  if(!entidad) throw Error('No se encontraron entidades con ese mail'); 

  return entidad;
};

module.exports = {
  findVdv,
};
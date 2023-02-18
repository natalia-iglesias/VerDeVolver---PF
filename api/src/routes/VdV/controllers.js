const { VdV, Material } = require('../../db.js');

async function chargeDbVdVs(vdvs) {
  // console.log(vdvs);
  const result = await Promise.all(
    vdvs.map(async (vdv) => {
      console.log(vdv);
      const {
        name,
        img,
        description,
        mail,
        password,
        address,
        CBU,
        materials,
      } = vdv;
      const createVdV = await VdV.create(
        name,
        img,
        description,
        mail,
        password,
        address,
        CBU
      );
      await createVdV.addMaterials(materials);
      result.push(createVdV);
    })
  );
  // const bulkCreateVdvs = await VdV.bulkCreate();
  // console.log(result);
  return result;
}

//---------------------***--------------------------//

const vdvCreate = async (body) => {
  const { name, img, description, mail, password, address, CBU, materials } =
    body;

  const vdvCreate = await VdV.create({
    name,
    img,
    mail,
    password,
    address,
    description,
    CBU,
  });

  await vdvCreate.addMaterials(materials);

  return vdvCreate;
};

const getVdV = async (obj) => {
  // console.log('obj', obj);
  const allVdV = await VdV.findAll({
    // where: {
    //   obj,
    include: [
      {
        model: Material,
        attributes: ['name'],

        through: {
          attributes: [],
        },
      },
    ],
  });
  return allVdV;
};

const getByIdVdV = async (id) => {
  const VdVFind = await VdV.findByPk(id, {
    include: [
      {
        model: Material,
        attributes: ['name'],

        through: {
          attributes: [],
        },
      },
    ],
  });
  return VdVFind;
};

const upDateVdV = async (id, body) => {
  const VdVupDate = await VdV.update(body, {
    where: { id },
  });
  // getbyid -> id guardo en constante y retorno
  return VdVupDate;
};

const deleteVdV = (id) => {
  const VdVdelete = VdV.destroy({
    where: {
      id,
    },
  });
  return VdVdelete;
};

// Implamentar creacion de password
const changeStatus = async (id) => {
  const result = VdV.update({ status: 'Pending' }, { where: { id } }); // Hay que invertir los valores cuando ya este el Admin funcionando
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

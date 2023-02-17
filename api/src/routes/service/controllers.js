const { Service } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbServices() {
  const bulkCreateServices = await Service.bulkCreate([
    { amount: '5000', UserId: '1', VdVId: '1' },
    { amount: '5000', UserId: '1', VdVId: '1' },
    { amount: '5000', UserId: '1', VdVId: '1' },
    { amount: '5000', UserId: '2', VdVId: '1' },
    { amount: '5000', UserId: '3', VdVId: '3' },
    { amount: '5000', UserId: '4', VdVId: '4' },
  ]);

  return bulkCreateServices;
}

async function createService(body) {
  //   console.log('body', body);
  const { amount, UserId, VdVId } = body;
  const newService = await Service.create({
    amount,
    UserId,
    VdVId,
  });

  return newService;
}
// Ver como podria utilizar un objeto que sea where el cual modifico dependiendo la peticion
const getByUserId = async (id) => {
  const serviceByUser = await Service.findAll({
    where: {
      UserId: id,
    },
  });
  return serviceByUser;
};

const getByVdVId = async (id) => {
  const serviceForVdV = await Service.findAll({
    where: {
      VdVId: id,
    },
  });
  return serviceForVdV;
};

const getAll = async () => {
  const allService = await Service.findAll();
  return allService;
};

module.exports = {
  createService,
  getByUserId,
  getByVdVId,
  chargeDbServices,
  getAll,
};

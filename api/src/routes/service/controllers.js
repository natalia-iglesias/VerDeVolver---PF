const { Service, VdV } = require('../../db.js');

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

module.exports = {
  createService,
  getByUserId,
  getByVdVId,
};

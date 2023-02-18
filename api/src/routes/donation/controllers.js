const { Op } = require('sequelize');
const { Donation } = require('../../db.js');

//ESTE ES EL BULKCREATE NO LO BORREN
async function chargeDbDonation() {
  const bulkCreateDonations = await Donation.bulkCreate([
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '1500', UserId: '1', VdVId: '1' },
    { amount: '2000', UserId: '1', VdVId: '1' },
    { amount: '2500', UserId: '2', VdVId: '1' },
    { amount: '3000', UserId: '3', VdVId: '3' },
    { amount: '5000', UserId: '4', VdVId: '4' },
  ]);

  return bulkCreateDonations;
}

const createDonation = async (body) => {
  const { amount, UserId, VdVId } = body;
  const result = await Donation.create({
    amount,
    UserId,
    VdVId,
  });
  return result;
};

const getAll = async () => {
  const result = Donation.findAll();
  return result;
};

const updateDonatios = async (id) => {
  const updateDon = await Donation.update(
    { status: 'Delivered' },
    {
      where: {
        id: id,
      },
    }
  );
  const result = await Donation.findByPk(id);
  return result;
};

const getByUserId = async (id) => {
  const result = await Donation.findAll({
    where: {
      UserId: id,
    },
  });
  return result;
};

const getByVdVId = async (id) => {
  const result = await Donation.findAll({
    where: {
      VdVId: id,
    },
  });
  return result;
};

module.exports = {
  chargeDbDonation,
  updateDonatios,
  getByUserId,
  getByVdVId,
  createDonation,
  getAll,
};

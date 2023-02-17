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

const updateDonatios = async (id) => {
  const updateDon = await Donation.update(
    { status: 'Delivered' },
    {
      where: {
        id: id,
      },
    }
  );
  return updateDon;
};
const findDonationByUser = async (UserId) => {
  try {
    //console.log(UserId);
    const comeStr = UserId.toString();
    const comeNum = Number(comeStr);
    // console.log('funcion: ', typeof comeStr);
    console.log(comeStr);
    const findId = await Donation.findAll({
      where: {
        UserId: {
          [Op.eq]: comeNum,
        },
      },
    });

    console.log(findId);

    if (!findId.length) throw Error(`El id ${idUser} no fue encontrado`);

    return findId;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

const findDonationByVdV = async (idVdV) => {
  try {
    const findId = await Donation.findAll({
      where: {
        VdVId: {
          [Op.eq]: idVdV,
        },
      },
    });

    if (!findId.length) throw Error(`El id ${idVdV} no fue encontrado`);

    return findId;
  } catch (error) {
    throw Error({ error: error.message });
  }
};

module.exports = {
  chargeDbDonation,
  updateDonatios,
  findDonationByUser,
  findDonationByVdV,
};

const { Op } = require('sequelize');
const { Donation, User, VdV } = require('../../db.js');

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
};

const createDonation = async (body) => {
  try {
    const { amount, UserId, VdVId } = body;

    const checkUsers = await User.findAll({
      where: {id: UserId}
    });
    const checkVdvs = await VdV.findAll({
      where: {id: VdVId}
    });

    if (!checkUsers || !checkVdvs) throw Error ('No se puede crear la donacion. El usuario o la VdV no existen');

    const newDonation = await Donation.create({  
      amount, 
      UserId, 
      VdVId,
      });

    return newDonation;

  } catch (error) {
    throw Error ('Ocurrio un error. No se puede crear la donacion');
  }
};

const getDonations = async () => {
  try {
    const donationsWUsersVdvData = await Donation.findAll({
      include: [{
        model: User
      }, {
        model: VdV
      }]
    });

    return donationsWUsersVdvData; 
    
  } catch (error) {
    throw Error ('Un error ocurrio. No se pueden traer las donaciones');
  }
};

const updateDonations = async (id) => {
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

const getDonationsById = async (id) => {
  try {
    if (!id ) throw Error('Debes ingresar un id');

    const donation = Donation.findByPk(id, {
      include: [{
        model: User
      }, {
        model: VdV
      }]
    });

    if (!donation) throw Error ('La donacion no existe');

    return donation;

  } catch (error) {
    throw Error ('Ocurrio un error. No se encuentra la donacion');
  }
};

const findDonationByUser = async (UserId) => {
  try {
    if (!UserId ) throw Error('Debes ingresar un id');

    const checkuser = await User.findAll( { where: {id: UserId} } );
    if (!checkuser) throw Error ('El usuario no existe');

    const findId = await Donation.findAll({
      where: {
        UserId: {
          [Op.eq]: UserId,
        },
      }, include: [{
        model: User
      }, {
        model: VdV
      }]
    });

    if (!findId) throw Error(`El id ${UserId} no fue encontrado`);

    return findId;

  } catch (error) {
    throw Error({ error: error.message });
  }
};

const findDonationByVdV = async (idVdV) => {
  try {
    if (!idVdV ) throw Error('Debes ingresar un id');
    
    const checkVdV = await VdV.findAll( { where: {id: idVdV} } );
    if (!checkVdV) throw Error ('La VdV no existe');

    const findId = await Donation.findAll({
      where: {
        VdVId: {
          [Op.eq]: idVdV,
        },
      }, include: [{
        model: User
      }, {
        model: VdV
      }]
    });

    if (!findId) throw Error(`El id ${idVdV} no fue encontrado`);

    return findId;

  } catch (error) {
    throw Error({ error: error.message });
  }
};


module.exports = {
  createDonation,
  chargeDbDonation,
  updateDonations,
  findDonationByUser,
  findDonationByVdV,
  getDonations,
  getDonationsById,
};

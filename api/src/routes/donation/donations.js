const { json } = require('body-parser');
const { Router } = require('express');
const { Donation } = require('../../db.js');
const {
  chargeDbDonation,
  findDonationByUser,
  findDonationByVdV,
} = require('./controllers.js');

const router = Router();

/* router.post('/', async (req, res) => {
  const { amount, UserId, VdVId } = req.body;
  console.log('userId', UserId, typeof UserId);
  console.log('vdvId', VdVId, typeof VdVId);
  try {
    const newDonation = await Donation.create({
      amount,
      UserId,
      VdVId,
    });

    res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
  }
}); */

//ESTE ES EL BULKCREATE NO LO BORREN
router.post('/chargeDb', async (req, res) => {
  // /donations/chargeDb
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  // /donations
  try {
    const allDonations = await Donation.findAll();
    return res.status(200).send(allDonations);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// const { UserId, VdVId } = req.query;
// console.log('ruta: ', typeof UserId);

// if (UserId) {

// }
// if (VdVId) {

// }

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByUser = await findDonationByUser(id);
    return res.status(200).json(findByUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByVdV = await findDonationByVdV(id);
    return res.status(200).json(findByVdV);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
module.exports = router;

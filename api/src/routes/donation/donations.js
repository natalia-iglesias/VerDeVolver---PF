const { Router } = require('express');
const { Donation } = require('../../db.js');
const { chargeDbDonation } = require('./controllers.js');

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
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allDonations = await Donation.findAll();
    res.status(200).send(allDonations);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


module.exports = router;

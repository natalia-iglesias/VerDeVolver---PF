const { Router } = require('express');
const { Donation } = require('../../db.js');
const { chargeDbDonation, updateDonatios } = require('./controllers.js');

const router = Router();

router.post('/', async (req, res) => {
  const { amount, UserId, VdVId } = req.body;
  console.log('userId', UserId, typeof UserId);
  console.log('vdvId', VdVId, typeof VdVId);
  try {
    const newDonation = await Donation.create({
      amount,
      UserId,
      VdVId,
    });
    //--- //  newDonation.createAd : newdonation.createdAd.slice()
    res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  // /donations
  try {
    const allDonations = await Donation.findAll();
    res.status(200).send(allDonations);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateDon = await updateDonatios(id);
    updateDon > 0
      ? res.status(200).send(`Donacion ID ${id}, status actualizado `)
      : res.status(404).send('No se encontro donacion con ese ID');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

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

module.exports = router;

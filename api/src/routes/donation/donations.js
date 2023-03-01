const { Router } = require('express');
const { mercadopago } = require('../mercadoPago.js');

const {
  chargeDbDonation,
  getByUserId,
  getByVdVId,
  updateDonations,
  createDonation,
  getAll,
  getDonationsById,
  MPfunction,
} = require('./controllers.js');

const router = Router();

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newDonation = await createDonation(body); 

    mercadopago.preferences
      .create(newDonation)
      .then((response) => res.status(200).send(response));
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const allDonations = await getAll();

    return res.status(200).send(allDonations);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateDon = await updateDonations(id);
    if (updateDon)
      res.status(200).send(`Donacion ID ${id}, status actualizado `);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const findByUser = await getByUserId(id);
    return res.status(200).json(findByUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByVdV = await getByVdVId(id);
    return res.status(200).json(findByVdV);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await getDonationsById(id);
    res.status(200).send(donation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

const { Router } = require('express');
const {
  chargeDbDonation,
  getByUserId,
  getByVdVId,
  updateDonatios,
  createDonation,
  getAll,
} = require('./controllers.js');

const router = Router();

//ESTE ES EL BULKCREATE NO LO BORREN
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// creacion de donacion
router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newDonation = await createDonation(body);
    res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener todos
router.get('/', async (req, res) => {
  try {
    const allDonations = await getAll();
    return res.status(200).send(allDonations);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// modificacion de Pending a Delivered (status)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateDon = await updateDonatios(id);
    res.status(200).send(updateDon);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener las donaciones del usuarioId
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const findByUser = await getByUserId(id);
    return res.status(200).json(findByUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// obtener las donaciones a la VdVId
router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByVdV = await getByVdVId(id);
    return res.status(200).json(findByVdV);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});
module.exports = router;

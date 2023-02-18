const { Router } = require('express');
const {
  createService,
  getByUserId,
  getByVdVId,
  chargeDbServices,
  getAll,
} = require('./controllers.js');

const router = Router();

//ESTE ES EL BULKCREATE NO LO BORREN
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeServicesDb = await chargeDbServices();
    res.status(200).send(chargeServicesDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// crear compra de service
router.post('/', async (req, res) => {
  try {
    const newFeedback = await createService(req.body);
    console.log('newFeedback', newFeedback, typeof newFeedback);
    console.log(
      'newFeedbackQueTieneDentro',
      typeof newFeedback.dataValues.date
    );
    // newFeedback.createdAt = newFeedback.createdAt.slice(0, 10);
    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener todas
router.get('/', async (req, res) => {
  try {
    const allServices = await getAll();
    res.status(200).send(allServices);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener por id user
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceByUser = await getByUserId(id);
    res.status(200).send(serviceByUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// obtener por id vdv
router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceForVdV = await getByVdVId(id);
    res.status(200).send(serviceForVdV);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

const { Router } = require('express');
const {
  createService,
  getByUserId,
  getByVdVId,
  chargeDbServices,
  getAll,
  getServiceById,
} = require('./controllers.js');

const router = Router();

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeServicesDb = await chargeDbServices();
    res.status(200).send(chargeServicesDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newFeedback = await createService(req.body);

    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allServices = await getAll();
    res.status(200).send(allServices);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceByUser = await getByUserId(id);
    res.status(200).send(serviceByUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const serviceForVdV = await getByVdVId(id);
    res.status(200).send(serviceForVdV);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const service = await getServiceById(id);
    res.status(200).send(service);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

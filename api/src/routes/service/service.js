const { Router } = require('express');
const { createService, getByUserId, getByVdVId } = require('./controllers.js');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const newFeedback = await createService(req.body);
    res.status(200).send(newFeedback);
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

module.exports = router;

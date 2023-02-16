const { Router } = require('express');
const { Feedback } = require('../../db.js');
const { chargeDbFeedback } = require('./controllers.js');

const router = Router();


//ESTE ES EL BULKCREATE NO LO BORREN
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeFeedbacksDb = await chargeDbFeedback();
    res.status(200).send(chargeFeedbacksDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allFeedbacks = await Feedback.findAll();
    res.status(200).send(allFeedbacks);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


module.exports = router;
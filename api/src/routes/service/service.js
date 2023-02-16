const { Router } = require('express');
const { Service } = require('../../db.js');

const router = Router();

router.post('/', async (req, res) => {
  const { amount, UserId, VdVId } = req.body;
  console.log('userId', UserId, typeof UserId);
  console.log('vdvId', VdVId, typeof VdVId);
  try {
    const newFeedback = await Service.create({
      amount,
      UserId,
      VdVId,
    });

    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

const { Router } = require('express');
const { Feedback } = require('../../db.js');

const router = Router();

router.post('/', async (req, res) => {
  const { comment, rating, UserId, VdVId } = req.body;
  console.log('userId', UserId, typeof UserId);
  console.log('vdvId', VdVId, typeof VdVId);
  try {
    const newFeedback = await Feedback.create({
      comment,
      rating,
      UserId,
      VdVId,
    });

    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

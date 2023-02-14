const { Router } = require('express');
const { Donation } = require('../db.js');

const router = Router();

router.post('/Donation', async (req, res) => {
  const data = req.body;
  try {
    const newDonation = await Donation.create({
      amount: data.amount,
    });
    res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

const { Router } = require('express');
const { sendEmail } = require('./controller');
const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, mail, description } = req.body;

    await sendEmail(name, mail, description);

    res.status(200).send('The email has been sent');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

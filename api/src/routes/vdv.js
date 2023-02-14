const { Router } = require('express');
const { VdV } = require('../db.js');

const router = Router();

router.post('/vdv', async (req, res) => {
  const data = req.body;
  try {
    const newVdV = await VdV.create({
      id: data.mail,
      name: data.name,
      password: data.password,
      CBU: data.CBU,
      addres: data.addres,
      img: data.img,
      description: data.description,
    });
    res.status(200).send(newVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

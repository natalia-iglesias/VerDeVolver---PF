const { Router } = require('express');
const { VdV } = require('../../db.js');

const router = Router();

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const newVdV = await VdV.create({
      name: data.name,
      img: data.img,
      mail: data.mail,
      password: data.password,
      address: data.address,
      description: data.description,
      CBU: data.CBU,
    });
    res.status(200).send(newVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

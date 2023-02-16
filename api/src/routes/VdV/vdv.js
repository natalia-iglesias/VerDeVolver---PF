const { Router } = require('express');
const { chargeDbVdVs} = require('./controllers.js');
const { VdV } = require('../../db.js');

const router = Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const { materials } = req.body;
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

    await newVdV.addMaterials(materials);
    res.status(200).send(newVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeVdvsDb = await chargeDbVdVs();
    res.status(200).send(chargeVdvsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allVdvs = await VdV.findAll();
    res.status(200).send(allVdvs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

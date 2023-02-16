//aca rutas
const { Router } = require('express');
const { chargeDbMaterial } = require('./controllers.js');
console.log('chargeDbMaterial', chargeDbMaterial);

const router = Router();

router.post('/chargeDb', async (req, res) => {
  // /material/chargeDb
  try {
    const chargeMaterialDb = await chargeDbMaterial();
    res.status(200).send(chargeMaterialDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

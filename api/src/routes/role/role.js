// aca rutas
const { Router } = require('express');
const { chargeDbRoles } = require('./controllers.js');

const router = Router();

router.post('/chargeDb', async (req, res) => {
  // /material/chargeDb
  try {
    const chargeRolesDb = await chargeDbRoles();
    res.status(200).send(chargeRolesDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

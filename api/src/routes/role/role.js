// aca rutas
const { Router } = require('express');
const { chargeDbRoles, createRole, deleteRole } = require('./controllers.js');

const router = Router();

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newRole = await createRole(name);
    res.status(200).send(newRole);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/', async (req, res) => {
  const { name } = req.body;
  try {
    const role = await deleteRole(name);
    role > 0
      ? res.status(200).send(` Roll ${name} eliminado`)
      : res.status(404).send('No existe Roll');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

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

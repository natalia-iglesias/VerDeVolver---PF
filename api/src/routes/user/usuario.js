const { Router } = require('express');
const { chargeDbUsers} = require('./controllers.js');
const { User, Role } = require('../../db.js');

const router = Router();

/* router.post('/', async (req, res) => {
  const role = await Role.findByPk(1);
  console.log('role:', role);
  const data = req.body;
  console.log('data', data);
  try {
    const newUser = await User.create({
      name: data.name,
      last_name: data.last_name,
      mail: data.mail,
      password: data.password,
      address: data.address,
      RoleId: role.id,
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
}); */

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeUsersDb = await chargeDbUsers();
    res.status(200).send(chargeUsersDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


module.exports = router;

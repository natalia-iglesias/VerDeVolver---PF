const { Router } = require('express');
const {
  chargeDbUsers,
  postUser,
  getAllUser,
  getByName,
  findId,
  updateUser,
  deleteUser,
} = require('./controllers.js');
const { User, Role } = require('../../db.js');

const router = Router();

//  router.post('/', async (req, res) => {
//   const role = await Role.findByPk(1);
//   console.log('role:', role);
//   const data = req.body;
//   console.log('data', data);
//   try {
//     const newUser = await User.create({
//       name: data.name,
//       last_name: data.last_name,
//       mail: data.mail,
//       password: data.password,
//       address: data.address,
//       RoleId: role.id,
//     });
//     res.status(200).send(newUser);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

//NO BORREN. ESTE ES EL BULKCREATE PARA CARGAR LA BASE DE DATOS
router.post('/chargeDb', async (req, res) => {
  try {
    const chargeUsersDb = await chargeDbUsers();
    res.status(200).send(chargeUsersDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', postUser);

router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      const allUsers = await getAllUser();
      res.status(200).send(allUsers);
    } else {
      const userbyName = await getByName(name);

      !userbyName.length
        ? res.status(400).send(`El nombre ${name}, no fue encontrado`)
        : res.status(200).send(userbyName);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userSent = req.body;
    const upgradedId = await findId(id);

    if (!upgradedId) res.status(404).send(`El id ${id} no fue encontrado`);

    await updateUser(userSent, id);
    return res.status(200).send('El usuario ha sido actualizado exitosamente');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUser(id);
    return res
      .status(200)
      .send(`El usuario con id ${id}, fue eliminado satisfactoriamente`);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const { mail } = req.query;

//     const byMail = await findMail(mail);

//     if (!mail) {
//       const allUsers = await getAllUser();
//       res.status(200).send(allUsers);
//     }

//     !byMail
//       ? res.status(400).send(`El email ${mail}, no fue encontrado`)
//       : res.status(200).send(byMail[0]);
//   } catch (error) {
//     return res.status(404).send(error.message);
//   }
// });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const byId = await findId(id);

    !byId
      ? res.status(400).send(`El id ${id}, no fue encontrado`)
      : res.status(200).send(byId);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

module.exports = router;

const { Router } = require('express');
const { User } = require('../../db.js');

const router = Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const newUser = await User.create({
      name: data.name,
      last_name: data.last_name,
      mail: data.mail,
      password: data.password,
      address: data.address,
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

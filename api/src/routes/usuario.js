const { Router } = require('express');
const { User } = require('../db.js');

const router = Router();
console.log('hola');

router.post('/User', async (req, res) => {
  const data = req.body;
  console.log(body);
  try {
    const newUser = await User.create({
      id: data.mail,
      name: data.name,
      last_name: data.last_name,
      password: data.password,
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

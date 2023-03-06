const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const { findUser } = require('./controller.js');
const {findByMail} = require('../login/controller.js'); 

const router = Router();

router.post(
  '/',
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, SECRET);
      res.send({
        id: user.id,
        name: user.name,
        mail: user.mail,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const { mail } = req.query;
      const user = await findByMail(mail);
      res.send(user);
    } catch (error) {
      console.log('error');
      next(error);
    }
  }
);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const { user } = req;
    res.redirect(`http://localhost:5174/login/${user.id}`);
  }
);


module.exports = router;

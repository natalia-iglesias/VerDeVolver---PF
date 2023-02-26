const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const User = require('../../db');
const { findUser } = require('./controller.js');

const router = Router();

//login

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
//estrategia autirizacion
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res, next) => {
    try {
      res.send('autorizado');
    } catch (error) {
      next(error);
    }
  }
);
//redirigir al home ?? true--->/home-- false--> / registro
//funcion redirect
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);
//CERRAR
router.get('/', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });
});
module.exports = router;

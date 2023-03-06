const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const { findVdv } = require('./controller.js');

const router = Router();

router.post(
  '/',
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const vdv = req.vdv;
      const payload = {
        sub: vdv.id,
      };
      const token = jwt.sign(payload, SECRET);
      res.send({
        id: vdv.id,
        name: vdv.name,
        mail: vdv.mail,
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
      const vdv = await findVdv(mail);
      res.send(vdv);
    } catch (error) {
      console.log('error');
      next(error);
    }
  }
);

module.exports = router;
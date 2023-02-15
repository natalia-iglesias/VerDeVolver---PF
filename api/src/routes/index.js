const { Router } = require('express');
const express = require('express');

const router = Router();

const userMiddle = require('./user/usuario.js');
const vdvMiddle = require('./VdV/vdv.js');
const donationMiddle = require('./donation/donations.js');

router.use(express.json());

router.use('/user', userMiddle);
router.use('/vdv', vdvMiddle);
router.use('/donation', donationMiddle);

module.exports = router;

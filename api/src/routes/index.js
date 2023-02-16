const { Router } = require('express');
// const express = require('express');

const router = Router();

const userMiddle = require('./user/usuario.js');
const vdvMiddle = require('./VdV/vdv.js');
const donationMiddle = require('./donation/donations.js');
const feedbackMiddle = require('./feedback/feedback.js');
const serviceMiddle = require('./service/service.js');

// router.use(express.json());

router.use('/user', userMiddle);
router.use('/vdv', vdvMiddle);
router.use('/donation', donationMiddle);
router.use('/feedback', feedbackMiddle);
router.use('/service', serviceMiddle);

module.exports = router;

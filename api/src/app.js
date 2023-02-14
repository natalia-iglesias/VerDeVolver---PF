const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { User, VdV, Donation } = require('./db.js');

// importamos rutas
const routerUsers = require('./routes/usuario.js');
const routerVdV = require('./routes/vdv.js');
const routerDonation = require('./routes/donations.js');

require('./db.js');

const server = express();
server.name = 'API';

//middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

//corse
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// middlewares para las rutas
// server.use('/User', routerUsers);
// server.use('/vdv', routerVdV);
// server.use('/donation', routerDonation);

server.get('/', (req, res) => {
  try {
    res.status(200).send('funciona');
  } catch (error) {
    res.status(404).send(error);
  }
});

server.post('/user', async (req, res) => {
  const data = req.body;
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

server.post('/vdv', async (req, res) => {
  const data = req.body;
  try {
    const newVdV = await VdV.create({
      id: data.mail,
      name: data.name,
      password: data.password,
      CBU: data.CBU,
      addres: data.addres,
      img: data.img,
      description: data.description,
    });
    res.status(200).send(newVdV);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

server.post('/donation', async (req, res) => {
  const data = req.body;
  try {
    const newDonation = await Donation.create({
      amount: data.amount,
    });
    res.status(200).send(newDonation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

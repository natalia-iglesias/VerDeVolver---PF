const mercadopago = require('mercadopago');
require('dotenv').config();


mercadopago.configure({
  access_token:
    'APP_USR-2258033541917651-022315-d4663d97f5d010910748730342e5fe5d-1307513005',

});

module.exports = {
  mercadopago,
};

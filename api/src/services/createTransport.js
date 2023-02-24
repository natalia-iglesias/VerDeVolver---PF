const nodemailer = require('nodemailer');

const createNodemailerTransport = async () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'verdevolver@gmail.com',
      pass: 'hngpoqxjettmhpiv',
    },
  });
};

module.exports = {
  createNodemailerTransport,
};

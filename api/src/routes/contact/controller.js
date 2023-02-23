const nodemailer = require('nodemailer');
const { Contact } = require('../../db.js');

const sendEmail = async (name, mail, description) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'verdevolver@gmail.com',
      pass: 'hngpoqxjettmhpiv',
    },
  });

  await transporter.sendMail(
    {
      from: 'verdevolver@gmail.com',
      to: `${mail}`,
      subject: 'Gracias por contactarte con nosotros',
      text: 'Gracas por contactarte con nosotros',
      html: `
                  <h1>Hola ${name}, gracias por comunicarte con VerdeVolver</h1>
                  <p>Hemos recibido el siguiente mensaje: ${description}</p>
                  <p>En el menor tiempo nos comunicaremos contigo</p>
              `,
    },
    (error, info) => {
      if (error) {
        throw Error('An error has ocurred');
      } else {
        console.log('Email sent: ', info.response);
      }
    }
  );
};

const postComments = async (name, mail, description) => {
  await Contact.create({ name, mail, description });

  await sendEmail(name, mail, description);

  return 'Se ha enviado el mensaje con exito';
};

const allComents = async () => {
  const getAllComents = await Contact.findAll();
  return getAllComents;
};

module.exports = {
  postComments,
  allComents,
};

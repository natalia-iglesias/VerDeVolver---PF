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
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VerdeVolver</title>
        <style type="text/css">
          .container{
            background-color: #E1FFEB;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          img { 
            height: auto; 
            width: 50vw; 
            margin: 30px 
          }

          .text_container {
            display: block;
            justify-content: center;
            align-items: center;
          }

          h1 {
            font-size: 35px; 
            color: black; 
            font-family: Verdana;
          }

          p { 
            color: black; 
            font-family: Verdana; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img alt="logo-vdv" src="https://res.cloudinary.com/verdevolver/image/upload/v1677343466/Header_Mail_pblyyo.png" class="header" />
          <div class="text_container">
            <h1>Hola ${name}, gracias por comunicarte con Verdevolver</h1>
            <p>Hemos recibido el siguiente mensaje: ${description}</p>
            <p>En el menor tiempo nos comunicaremos contigo</p>
            <img alt="fondo-vdv" src="https://res.cloudinary.com/verdevolver/image/upload/v1677345555/Fondo2_zstsxi.png" class="fondo_imagen" />
          </div>
        </div>
      </body>
      </html>
              `,
      disableUrlAccess: false,
      attachments: [
        {
          filename: 'Header_Mail_pblyyo.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677343466/Header_Mail_pblyyo.png',
          cid: 'vdv@Logo',
        },
        {
          filename: 'Fondo2_zstsxi.png',
          path: 'https://res.cloudinary.com/verdevolver/image/upload/v1677345555/Fondo2_zstsxi.png',
          cid: 'vdv@Fondo',
        },
      ],
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

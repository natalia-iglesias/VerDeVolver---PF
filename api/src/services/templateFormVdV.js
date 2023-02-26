const nodemailer = require('nodemailer');

const sendVdVFormEmail = async (name, mail) => {
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
      subject: 'Recibimos tu formulario!',
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
            <h1>Hola ${name},gracias por completar nuestro formulario.</h1>
            <p>Los administradores revisarán tu solicitud cuidadosamente.</p>
            <p>Recibirás una respuesta en los próximos días!</p>
            <p>Que tengas muy buen día,</p>
            <p>Equipo de Verde Volver</p>
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
      j,
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

module.exports = {
  sendVdVFormEmail,
};

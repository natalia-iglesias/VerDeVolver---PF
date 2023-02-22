// const nodemailer = require('nodemailer');

// async function sendMail() {
//   //   let testAccount = await nodemailer.createTestAccount();

//   //   let transporter = nodemailer.createTransport({
//   //     host: 'smtp.gmail.com',
//   //     port: 587,
//   //     secure: false, // true for 465, false for other ports
//   //     auth: {
//   //       user: 'verdevolver@gmail.com', // generated ethereal user
//   //       pass: 'verdevolver2023.', // generated ethereal password
//   //     },
//   //   });

//   let info = await transporter.sendMail({
//     from: '"Verde Volver" <verdevolver@gmail.com>', // sender address
//     to: 'gomez.solanarocio@gmail.com', // list of receivers
//     subject: 'Gracias por realizar una donación!', // Subject line
//     text: 'Recibimos tu donación correctamente.', // plain text body
//     html: '<b>Recibimos tu donación correctamente.</b>', // html body
//   });

//   console.log('Message sent: %s', info);

//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// }

// sendMail().catch(console.error);

// module.exports = { sendMail };

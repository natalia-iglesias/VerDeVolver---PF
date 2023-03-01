const { Contact } = require('../../db.js');
const { sendEmail } = require('../../services/email');
const { EMAIL } = process.env;

const {
  htmlContactEmailTemplate,
  htmlAdminEmailTemplate,
} = require('../../services/email/templates/templateContact');

const postComments = async (name, mail, description) => {
  await Contact.create({ name, mail, description });

  sendEmail(
    mail,
    'Gracias por contactarnos 💚',
    htmlContactEmailTemplate(name, description)
  );

  sendEmail(
    EMAIL,
    'Has sido contactado por el usuario 💚' + name,
    htmlAdminEmailTemplate(description, mail)
  );

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

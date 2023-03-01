const LocalStrategy = require('passport-local');
const { User } = require('../db.js');

const localStrategy = new LocalStrategy(
  {
    usernameField: 'mail', 
    passwordField: 'password', 
  },
  async function (mail, password, done) {
    try {
      const user = await User.findOne({ where: { mail } });
      if (!user) {
        return done(null, false, {
          message: 'Correo electrónico incorrecto.',
        });
      }
      if (password !== user.password) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
  
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = localStrategy;

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;

module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env(SMTP_HOST, 'smtp.example.com'),
      port: env(SMTP_PORT, 587),
      auth: {
        user: env(SMTP_USERNAME),
        pass: env(SMTP_PASSWORD),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: 'verdevolver@gmail.com',
      defaultReplyTo: 'verdevolver@gmail.com',
    },
  },
});

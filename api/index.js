const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { DB_PORT } = process.env;

conn.sync({ force: false }).then(() => {
  server.listen(DB_PORT, () => {
    console.log(`%s listening at ${DB_PORT}`); // eslint-disable-line no-console
  });
});

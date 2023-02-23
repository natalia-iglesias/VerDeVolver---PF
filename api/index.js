const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();
const { PGPORT } = process.env;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PGPORT, () => {
    console.log(`%s listening at ${PGPORT}`); // eslint-disable-line no-console
  });
});

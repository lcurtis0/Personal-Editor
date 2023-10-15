const path = require('path');

// For routes nothing needs to be done because the site will be a single page

module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );



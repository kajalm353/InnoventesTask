const express = require('express');
// const app = express();
const bodyParser = require('body-parser');

const music_album = require('../routes/music_album');
const musicians = require('../routes/musicians')

const cors = require('../middleware/cors')


module.exports = function (app) {

  app.use(cors)


  app.use(bodyParser({
    limit: '50mb'
  }));


  app.use(express.json());
  app.use('/api/music_album', music_album);
  app.use('/api/musicians',musicians)
  // app.use('/api/orders', order)

};
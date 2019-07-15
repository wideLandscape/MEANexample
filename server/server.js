const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config.json'),
  jwt = require('./_helpers/jwt');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected');
  },
  err => {
    console.log('Can not connect to the database' + err);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());
app.use('/employees', require('./employees/employees.controller'));

const port = process.env.PORT || 4000;

const server = app.listen(port, function() {
  console.log('Listening on port ' + port);
});

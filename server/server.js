const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config.json'),
  jwt = require('./_helpers/jwt');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected');

    const Employees = require('./employees/employee.model');
    console.log('seek');
    Employees.findOne({ isAdmin: true }, (err, admin) => {
      if (err || !admin) {
        admin = new Employees({
          username: 'admin',
          password: 'admin',
          isAdmin: true
        });
        admin
          .save()
          .then(admin => {
            console.log('admin created', admin);
          })
          .catch(err => {
            console.log('could not create admin :(', err);
          });
      }
    });
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

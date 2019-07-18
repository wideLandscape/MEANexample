const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config.json'),
  jwt = require('./_helpers/jwt'),
  errorHandler = require('./_helpers/error-handler');

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useCreateIndex: true })
  .then(
    () => {
      console.log('Database is connected');
      initEmployees();
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
app.use('/reviews', require('./reviews/reviews.controller'));
app.use('/assignments', require('./assignments/assignments.controller'));

app.use(errorHandler);
const port = process.env.PORT || 4000;

const server = app.listen(port, function() {
  console.log('Listening on port ' + port);
});

const initEmployees = async () => {
  const Employees = require('./employees/employee.model');
  try {
    let admin = await Employees.findOne({ isAdmin: true });
    if (!admin) {
      admin = new Employees({
        username: 'admin',
        password: 'admin',
        isAdmin: true
      });
      await admin.save();
      console.log('admin created', admin);
    }
  } catch (e) {
    console.log('could not create admin :(', e);
  }
};

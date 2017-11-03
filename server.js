const express = require('express');
//const fs = require('fs');
const mysql = require('mysql');
const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
  });
}

const host = "localhost"
const user = "root"
const pswd = ""
const dbname = "books"

// config db ====================================
const pool = mysql.createPool({
  host: "frn.c7iflgbhvhqx.us-west-1.rds.amazonaws.com",
  user: "frncsteam",
  password: "GraceH0ppah",
  database: "frn"
});

const COLUMNS = [
  'last_name',
  'first_name'
];

app.get('/api/books', (req, res) => {

  const firstName = req.query.firstName;

  queryString = "SELECT * FROM user"

  pool.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/insert', (req, res) => {

  const phone = req.query.phone;
  const email = req.query.email;

  console.log(phone);
  console.log(email);


  queryString = "INSERT INTO user (phone_number, email) VALUES ('" + phone +  "', '" + email + "')"

  pool.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
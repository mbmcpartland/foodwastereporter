const express = require('express');
//const fs = require('fs');
const mysql = require('mysql');
var cors = require('cors');
const app = express();

app.use(cors());

app.set('port', (process.env.PORT || 3000));

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
var correct_password = "";

// config db ====================================
// const pool = mysql.createPool({
//   host: "frn.c7iflgbhvhqx.us-west-1.rds.amazonaws.com",
//   user: "frncsteam",
//   password: "GraceH0ppah",
//   database: "frn"
// });

const COLUMNS = [
  'last_name',
  'first_name'
];

var con = mysql.createConnection({
  host: "frn.c7iflgbhvhqx.us-west-1.rds.amazonaws.com",
  user: "frncsteam",
  password: "GraceH0ppah",
  database: "frn"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM credential", function (err, result, fields) {
    if (err) throw err;
    var string=JSON.stringify(result);
    var json =  JSON.parse(string);
    correct_password = json[0].hash;
    console.log(correct_password);
  });
});   //move this

app.use('/api/auth', function(req, res) {
  const pass = req.query.pass;
  var crypto = require('crypto');
  if(undefined === pass) {
    return;
  }
  var enc = crypto.createHash('md5').update(pass).digest("hex");
  if(undefined === enc) {
    return;
  }
  if(enc !== correct_password) {
    console.log('incorrect password bub!');
    res.statusMessage = 'Nothing';
    res.send({ message: 'fail' });
  } else {
    console.log('correct password!');
    res.statusMessage = 'Nothing';
    res.send({ message: 'success' });
  }
});

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




app.use('/api/events', (req, res) => {
  console.log("sup bitch");

  queryString = `SELECT * from report`;
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});



app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

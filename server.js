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
    console.log('incorrect password!');
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

  con.query(queryString,function (err, result, fields) {
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

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.use('/api/users', (req, res) => {
    console.log("/api/users accessed");

    queryString = `SELECT * from user`;

    con.query(queryString,
        function(err, rows, fields) {
      if (err) throw err;
      var string=JSON.stringify(rows);
      var json =  JSON.parse(string);
      //console.log(json);

      res.statusMessage = 'okeh';
      res.send(json);
        });

});

app.use('/api/building', (req, res) => {
    console.log("/api/building accessed");

    queryString = `SELECT * from building`;

    con.query(queryString,
        function(err, rows, fields) {
      if (err) throw err;
      var string=JSON.stringify(rows);
      var json =  JSON.parse(string);
      //console.log(json);

      res.statusMessage = 'okeh';
      res.send(json);
    });

});

app.use('/api/getevents', (req, res) => {
    console.log("/api/getevents accessed");

    queryString = `SELECT * from event`;

    con.query(queryString,
        function(err, rows, fields) {
      if (err) throw err;
      var string=JSON.stringify(rows);
      var json =  JSON.parse(string);
      //console.log(json);

      res.statusMessage = 'okeh';
      res.send(json);
        });

});

app.use('/api/editReports', (req, res) => {
  console.log("/api/editReports accessed");
  const timecreated = req.query.tc;
  const location = req.query.loc;
  const building = req.query.build;
  const pending = req.query.pend;
  const successful = req.query.succ;
  const weight = req.query.weight;
  const description = req.query.desc;
  const userID = req.query.use;
  const reportID = req.query.primaryKey;
  
  if(timecreated === "" && location === "" && building === "" && pending === "" && 
    successful === "" && weight === "" && description === "" && userID === "") {
    return;
  }

  queryString = "UPDATE report SET"
  if(timecreated !== "") {
    queryString += " time_created = '";
    queryString += timecreated;
    queryString += "',";
  }
  if(location !== "") {
    queryString += " location = '";
    queryString += location;
    queryString += "',";
  }
  if(building !== "") {
    queryString += " building_id = '";
    queryString += building;
    queryString += "',";
  }
  if(pending !== "") {
    queryString += " pending = '";
    queryString += pending;
    queryString += "',";
  }
  if(successful !== "") {
    queryString += " successful = '";
    queryString += successful;
    queryString += "',";
  }
  if(weight !== "") {
    queryString += " weight = '";
    queryString += weight;
    queryString += "',";
  }
  if(description !== "") {
    queryString += " description = '";
    queryString += description;
    queryString += "',";
  }
  if(userID !== "") {
    queryString += " user_id = '";
    queryString += userID;
    queryString += "',";
  }
  queryString = queryString.slice(0, -1);
  queryString += " WHERE report_id = ";
  queryString += reportID;
  queryString += ";";

  console.log(queryString);
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          //console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});

app.use('/api/editUsers', (req, res) => {
  console.log("/api/editUsers accessed");
  const phonenumber = req.query.phone;
  const email = req.query.email;
  const name = req.query.name;
  const userID = req.query.primaryKey;

  if(phonenumber === "" && email === "" && name === "") {
    return;
  }

  queryString = "UPDATE user SET"
  if(phonenumber !== "") {
    queryString += " phone_number = '";
    queryString += phonenumber;
    queryString += "',";
  }
  if(email !== "") {
    queryString += " email = '";
    queryString += email;
    queryString += "',";
  }
  if(name !== "") {
    queryString += " name = '";
    queryString += name;
    queryString += "',";
  }
  queryString = queryString.slice(0, -1);
  queryString += " WHERE user_id = ";
  queryString += userID;
  queryString += ";";

  console.log(queryString);
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          //console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});

app.use('/api/editBuildings', (req, res) => {
  console.log("/api/editUsers accessed");
  const building_name = req.query.name;
  const buildingID = req.query.primaryKey;

  if(building_name === "") {
    return;
  }

  queryString = "UPDATE building SET"
  if(building_name !== "") {
    queryString += " name = '";
    queryString += building_name;
    queryString += "'";
  }
  queryString += " WHERE building_id = ";
  queryString += buildingID;
  queryString += ";";

  console.log(queryString);
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          //console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});

app.use('/api/editEvents', (req, res) => {
  console.log("/api/editUsers accessed");
  const event_name = req.query.name;
  const event_description = req.query.description;
  const event_id = req.query.primaryKey;

  if(event_name === "" && event_description === "") {
    return;
  }

  queryString = "UPDATE event SET"
  if(event_name !== "") {
    queryString += " name = '";
    queryString += event_name;
    queryString += "',";
  }
  if(event_description !== "") {
    queryString += " description = '";
    queryString += event_description;
    queryString += "',";
  }
  queryString = queryString.slice(0, -1);
  queryString += " WHERE event_id = ";
  queryString += event_id;
  queryString += ";";

  console.log(queryString);
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          //console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});

app.get('/api/addReport', (req, res) => {
  console.log("add report");

  const timecreated = req.query.tc;
  const location = req.query.loc;
  const building = req.query.build;
  const pending = req.query.pend;
  const successful = req.query.succ;
  const weight = req.query.weight;
  const description = req.query.desc;
  const user_id = req.query.use;
  console.log(description);


  queryString = "INSERT INTO report (time_created, location, building_id, pending, successful, weight, description, user_id) VALUES ('" + 
    timecreated +  "', '" + location + "', '" + building + "', '" + pending + "', '" + successful + "', '" + weight +  "', '" +
    description + "', '" + user_id + "')";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/addUser', (req, res) => {
  console.log("add user");

  const phonenumber = req.query.phonenumber;
  const email = req.query.email;
  const name = req.query.name;


  queryString = "INSERT INTO user (phone_number, email, name) VALUES ('" + 
    phonenumber +  "', '" + email + "', '" + name + "')";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/addEvent', (req, res) => {
  console.log("add event");

  const name = req.query.name;
  const description = req.query.desc;


  queryString = "INSERT INTO event (name, description) VALUES ('" + 
    name +  "', '" + description + "')";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/addBuilding', (req, res) => {
  console.log("add building");

  const name = req.query.name;
  const buildID = req.query.buildID;


  queryString = "INSERT INTO building (name, building_id) VALUES ('" + 
    name +  "', '" + buildID + "')";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/deleteReport', (req, res) => {
  console.log("add report");
  const reportID = req.query.primaryKey;

  if(reportID === "") {
    return;
  }


  queryString = "DELETE FROM report WHERE report_id = ";
  queryString += reportID;
  queryString += ";";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/deleteEvent', (req, res) => {
  console.log("delete event");
  const eventID = req.query.primaryKey;

  if(eventID === "") {
    return;
  }


  queryString = "DELETE FROM event WHERE event_id = ";
  queryString += eventID;
  queryString += ";";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/deleteUser', (req, res) => {
  console.log("delete user");
  const userID = req.query.primaryKey;

  if(userID === "") {
    return;
  }


  queryString = "DELETE FROM user WHERE user_id = ";
  queryString += userID;
  queryString += ";";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.get('/api/deleteBuilding', (req, res) => {
  console.log("delete building");
  const buildingID = req.query.primaryKey;

  if(buildingID === "") {
    return;
  }


  queryString = "DELETE FROM building WHERE building_id = ";
  queryString += buildingID;
  queryString += ";";

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});


app.use('/api/reports', (req, res) => {
  console.log("/api/reports accessed");

  queryString = `SELECT * from report`;
  
  con.query(queryString,
         function(err, rows, fields) {
          if (err) throw err;
          var string=JSON.stringify(rows);
          var json =  JSON.parse(string);
          //console.log(json);

          res.statusMessage = 'okeh';
          res.send(json);
      });

});

app.get('/api/insertReport', (req, res) => {
  console.log("insert report");

  const date = req.query.date;
  const location = req.query.location;
  const description = req.query.description;


  queryString = "INSERT INTO report (time_created, location, description) VALUES ('" + date +  "', '" + location + "', '" + description + "')"

  con.query(queryString,function (err, result, fields) {
    if (err) throw err;
    console.log(result);

      });

});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
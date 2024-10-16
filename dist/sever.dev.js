"use strict";

// importing the neccessary dependancies
var express = require('express');

var mysql = require('mysql2');

var dotenv = require('dotenv');

var app = express();
dotenv.config(); // create a connection object

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}); // test the connection

db.connect(function (err) {
  // connection not successful
  if (err) {
    return console.log("Error connecting to MySQL", err);
  } // connection successful


  console.log("MySQL connection successful");
}); // ejs templating configuration
// ejs for the assignment is not necessary
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.get('/data', (req,res) => {
//     // Retrieve data from database 
//     db.query('SELECT * FROM patients', (err, results) =>{
//         if (err){
//             console.error(err);
//             res.status(500).send('Error Retrieving data')
//         }else {
//             //Display the records to the browser 
//             res.render('data', {results: results});
//         }
//     });
// });
// get patients
// '/get-patient' is a route

app.get('/get-patients', function (req, res) {
  var getPatients = "SELECT * FROM patients";
  db.query(getPatients, function (err, results) {
    // have an error
    if (err) {
      return res.status(500).send("Failed to fetch the patients");
    } // get back the data/results


    res.status(200).send(results);
  });
}); // delcare the port and listen to the server

var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is running on PORT ".concat(PORT));
});
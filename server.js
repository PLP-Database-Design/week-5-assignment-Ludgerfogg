// importing the neccessary dependancies
const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')


const app = express()
dotenv.config()


// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection not successful
    if(err) {
        return console.log("Error connecting to MySQL", err)
    }

    // connection successful
    console.log("MySQL connection successful")
})



// 1. Retrieve all patients

app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"

    db.query(getPatients, (err, results) => {
        // have an error
        if(err) {
            return res.status(500).send("Failed to fetch the patients")
        }

        // get back the data/results
        res.status(200).send(results)
    })
})

// 2. Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send('Cannot get provider')
    }
    res.status(200).send(result)      

  });
});


// 3. Filter patients by First Name
app.get('/patients/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  const query = 'SELECT * FROM patients WHERE first_name = ?';

  db.query(query, [firstName], (err, result) => {
    if (err) {
     return res.status(500).send('No Head Way');
    } 
      res.status (200).send(result)
    });
  });


  // 4. Retrieve all providers by their specialty
  app.get('/providers/:specialty', (req, res) => {
    const specialty = req.params.specialty;
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
  
    db.query(query, [specialty], (err, result) => {
      if (err) {
       
       return res.status(500).send('Error fetching specialty');
      }
        res.send(result);
    });
  });



// delcare the port and listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});
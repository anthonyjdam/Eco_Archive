import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  port: "33061",
  user: "root",
  password: "password",
  database: "eco_archive",
});

// db.connect((err) => {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + db.threadId);
// });

/*
 *   TODO: add the endpoints here
 */

// Login endpoint
app.post("/api/processLogin", (req, res) => {
  console.log(req.body);

  db.query(
    `SELECT Password FROM ${req.body.userType} WHERE Username = ?`,
    [req.body.username],
    (error, results, fields) => {
      if (error) {
        console.log(error);
      } else if (results) {
        console.log(results);

        if (results.length === 0) {
          res.send("Unauthorized");
        } else if (results[0].Password === req.body.password) {
          res.status(200).send({
            message: "Authorized",
            username: req.body.username,
          });
        }
      }
    }
  );
});

// Sign Up endpoint
app.post("/api/processSignup", (req, res) => {
  console.log(req.body);

  db.query(
    `INSERT INTO customer (FName, LName, Username, Password, AddressLine, City, Province, PostalCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      req.body.addressLine,
      req.body.city,
      req.body.province,
      req.body.postalCode,
    ],
    (error, results, fields) => {
      if (error) {
        console.log(error.code);
        res.send(error.code);
      } else if (results) {
        console.log(results);
        res.send("Sign up successful");
      }
    }
  );

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

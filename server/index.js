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
  password: "password", // Set to cheetos for Maira
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
  // console.log(req.body);

  db.query(
    `SELECT Password FROM ?? WHERE Username = ?`,
    [req.body.userType, req.body.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);

        if (results.length === 0) {
          res.status(401).end();
        } else if (results[0].Password === req.body.password) {
          console.log(results[0]);
          res.status(200).json(results[0]);
        } else {
          res.status(401).end();
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
    (error, results) => {
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

// API endpoint for getting a specific customer
app.get("/api/customer/:username", (req, res) => {
  console.log(req.params.username);

  db.query(
    `SELECT * FROM customer WHERE Username = ?`,
    [req.params.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        console.log(results);
        res.json(results);
      }
    }
  );
});

// API endpoint for getting all recycling depots in the database
app.get("/api/recycling_depot", (req, res) => {
  db.query(`SELECT * FROM recycling_depot`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).end();
    } else if (results) {
      console.log(results);
      res.json(results);
    }
  });
});

// API endpoint for getting the list of recyclables accepted by a specific recycling depot
// Returns a list of recyclables that includes all the columns of the recyclables
app.get("/api/accepted_recyclable/:depotName", (req, res) => {
  console.log(req.params.depotName);

  db.query(
    `SELECT recyclable.* 
    FROM recyclable, accepts 
    WHERE accepts.BranchName = ? AND accepts.RecyclableName = recyclable.RecyclableName`,
    [req.params.depotName],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        console.log(results);
        res.json(results);
      }
    }
  );
});

// API endpoint for submitting a pickup request
app.post("/api/pickup", (req, res) => {
  console.log(req.body);

  db.query(
    `INSERT INTO transaction (Username, BranchName, RecyclableName, AmountOfMaterialsGiven, DateTime, ServiceType) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.body.username,
      req.body.branchName,
      req.body.recyclableName,
      req.body.amountOfMaterialsGiven,
      req.body.dateTime,
      "pickup",
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
        res.status(200).end();
      }
    }
  );
});

// // try {
//   //Query to the database
//   db.query(query, (error, results) => {
//     if (results) {
//       console.log(results);
//       res.status(200).send(results);


// API endpoint for submitting a drop off appointment
app.post("/api/dropoff", (req, res) => {
  console.log(req.body);




  db.query(
    `INSERT INTO transaction (Username, BranchName, RecyclableName, DateTime, ServiceType) VALUES (?, ?, ?, ?, ?)`,
    [
      req.body.username,
      req.body.branchName,
      "PLACEHOLDER",
      req.body.dateTime,
      "dropoff",
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
        res.status(200).end();
      }
    }
  );
});

// API endpoint for getting 3 most recent transactions for a specific customer
app.get("/api/transaction/:username", (req, res) => {
  console.log(req.params.username);

  db.query(
    `SELECT * FROM transaction WHERE Username = ? AND AmountEarned IS NOT NULL ORDER BY DateTime DESC LIMIT 3`,
    [req.params.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        console.log(results);
        res.json(results);

      }
    }
  );
});

// API endpoint for getting all the NGOs in the database
app.get("/api/ngo", (req, res) => {
  db.query(`SELECT * FROM ngo`, (error, results) => {
    if (error) {
      console.log(error);
      res.status(404).end();
    } else if (results) {
      console.log(results);
      res.json(results);
    }
  });
});

// API endpoint for making a donation to a specific NGO
app.post("/api/donate", (req, res) => {
  // Update amountRaised for the NGO after the donation
  db.query(
    `UPDATE ngo SET AmountRaised = AmountRaised + ?  WHERE NGOName = ?`,
    [req.body.donationAmt, req.body.selectedNGO],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
      }
    }
  );

  // Update the contribution of the customer after the donation
  db.query(
    `UPDATE customer SET DonationAmt = DonationAmt + ?, AccountBal = AccountBal - ? WHERE Username = ?`,
    [req.body.donationAmt, req.body.donationAmt, req.body.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
      }
    }
  );

  // Add row in the donates table
  db.query(
    `INSERT INTO donates (Username, NGOName, DonationAmount) VALUES (?, ?, ?)`,
    [req.body.username, req.body.selectedNGO, req.body.donationAmt],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
        res.status(200).end();
      }
    }
  );
});

app.post("/api/selectEmpWithName", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = `SELECT *
    FROM ??
    WHERE LName LIKE ? AND FName LIKE ?`; //search employee query
  const placeHolder = [
    req.body.userType,
    `%${req.body.lastName}%`,
    `%${req.body.firstName}%`,
  ]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder); //insert the placeholders into the query

  console.log(query);
  console.log(typeof req.body.firstName + typeof req.body.lastName);

  // try {
  //Query to the database
  db.query(query, (error, results) => {
    if (results) {
      res.status(200).send(results);
    } else if (error) {
      console.log("Error " + error);
      res.status(500).end();
    }
  });
  //   }
  //   catch (error) {
  //     console.log("Error " + error);
  //     res.status(500).send({error});
  //   }
});

app.post("/api/updateEmpWithUsername", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `DELETE
    FROM ?? 
    WHERE Username = ?`
  ); //search employee query
  const placeHolder = [req.body.userType, `%${req.body.username}%`]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);
  console.log(typeof req.body.username)

  //Query to the database
  db.query(query, (error, results) => {
    if (error) {
      console.log("Error " + error);
      res.status(500).end();
    }
  });

});

app.post("/api/deleteEmpWithUsername", (req, res) => {
  console.log(req.body);

  for (let i = 0; i < req.body.employeesToDelete.length; i++) {

    /*Create query variable*/
    const sql = (
      `DELETE
      FROM ?? 
      WHERE Username = ?`
    ); //search employee query
    const placeHolder = [req.body.userType, `${req.body.employeesToDelete[i].Username}`]; //placeholders into '?' and '??' parameters
    const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

    console.log(query);
    // console.log(typeof req.body.username)

    //Query to the database
    db.query(query, (error, results) => {
      if (results) {
        res.status(200).send(results);
      } else if (error) {
        console.log("Error " + error);
        res.status(500).end();
      }
    });
  }
});

app.post("/api/addEmpCred", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `INSERT INTO ??
      VALUES (?, ?, ?, ?)`
  ); //search employee query
  const placeHolder = [
    req.body.userType, 
    req.body.username,
    req.body.lastName,
    req.body.firstName,
    req.body.password
  
  ]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);
  // console.log(typeof req.body.username)

  //Query to the database
  db.query(query, (error, results) => {
    if (results) {
      res.status(200).send(results);
    } else if (error) {
      console.log("Error " + error);
      res.status(500).end();
    }
  });

});




// app.get("/api/", () => {
//   console.log("running on port 3001");
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

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
  password: "password", // Set to Ch33tos! for Maira
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

// API endpoint to Get the material rate and material type of the recyclable
app.get("/api/recyclable/:recyclableName", (req, res) => {
  db.query(
    `SELECT MaterialRate, MaterialType FROM recyclable WHERE RecyclableName = ?`,
    [req.params.recyclableName],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// API endpoint to Get the material rate for EVERY material type
app.get("/api/materialRate", (req, res) => {
  db.query(
    `SELECT DISTINCT MaterialRate, MaterialType FROM recyclable`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        console.log(results);
        res.status(200).json(results);
      }
    }
  );
});

// API endpoint to complete a transaction
app.post("/api/complete", (req, res) => {
  console.log(req.body);

  // Update the balance of the customer
  // Calculate the amountEarned

  db.query(
    `UPDATE customer SET AccountBal = AccountBal + ? WHERE Username = ?`,
    [req.body.amountearned, req.body.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log("000000000");
        console.log(results);
      }
    }
  );

  // Update the status of the transaction and the amountEarned column
  db.query(
    `UPDATE transaction SET Status = ?, AmountEarned = ? WHERE Username = ? AND BranchName = ? AND RecyclableName = ? AND DateTime = ?`,
    [
      req.body.status,
      req.body.amountearned,
      req.body.username,
      req.body.branchname,
      req.body.recyclablename,
      req.body.datetime,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log("2222222222222");
        console.log(results);
      }
    }
  );

  res.status(200).end();
});


// API endpoint to get the inventory counts
app.get("/api/inventoryCounts/:BranchName", (req, res) => {
  db.query(
    "SELECT * FROM inventory WHERE BranchName =?",
    [req.params.BranchName],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        res.status(200).json(results);
      }
    }
  );
});

// API endpoint to update inventory counts
app.post("/api/updateInventory", (req, res) => {
  console.log(req.body);
  db.query(
    `UPDATE inventory SET Lifetime${req.body.materialtype} = Lifetime${req.body.materialtype} + ?, Concurrent${req.body.materialtype} = Concurrent${req.body.materialtype} + ? WHERE BranchName = ?`,
    [req.body.materialcount, req.body.materialcount, req.body.branchname],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log("3333333333");
        console.log(results);
        res.status(200).end();
      }
    }
  );
});

// API endpoint to update inventory counts for multiple materials
app.post("/api/updateInventoryMultiple", (req, res) => {
  console.log(req.body);

  const materialCounts = req.body.materialtypeandcount;

  db.query(
    `UPDATE inventory 
    SET LifetimeGlass = LifetimeGlass + ?, 
    LifetimePaper = LifetimePaper + ?, 
    LifetimeMetal = LifetimeMetal + ?, 
    LifetimePlastic = LifetimePlastic + ?, 
    ConcurrentGlass = ConcurrentGlass + ?, 
    ConcurrentPaper = ConcurrentPaper + ?, 
    ConcurrentMetal = ConcurrentMetal + ?, 
    ConcurrentPlastic = ConcurrentPlastic + ? 
    WHERE BranchName = ?`,
    [
      +materialCounts.Glass,
      +materialCounts.Paper,
      +materialCounts.Metal,
      +materialCounts.Plastic,
      +materialCounts.Glass,
      +materialCounts.Paper,
      +materialCounts.Metal,
      +materialCounts.Plastic,
      req.body.branchname,
    ],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log("1111111");
        console.log(results);
        res.status(200).end();
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

// API endpoint for getting employee
app.get("/api/employee/:username", (req, res) => {
  console.log(req.params.username);

  db.query(
    `SELECT * FROM employee WHERE Username = ?`,
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


// API endpoint for getting admin info
app.get("/api/admin/:username", (req, res) => {
  console.log(req.params.username);

  db.query(
    `SELECT * FROM administrator WHERE Username =?`,
    [req.params.username],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(404).end();
      } else if (results) {
        res.json(results);
      }
    }
  );
});

// app.post("/api/employee/:username", (req,res) => {
//   const {Username, BranchName} = req.body;
//   const sqlInsert =
//     "INSERT INTO employee_workstation (Username, BranchName) VALUES (?, ?)";
//   db.query(sqlInsert, [Username, BranchName], (error, result) => {
//     if(error) {
//       console.log(error);
//     }
//   });
// });

app.post("/api/employee/:username", (req, res) => {
  // console.log(req.body);

  db.query(
    "INSERT INTO employee_workstation (BranchName, Username) VALUES (?, ?)",
    [req.body.branchname, req.body.username],
    (error, results) => {
      if (error) {
        console.log(error.code);
        res.send(error.code);
      } else if (results) {
        console.log(results);
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
    `SELECT * FROM transaction WHERE Username = ? AND AmountEarned IS NOT NULL ORDER BY DateTime DESC LIMIT 5`,
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

// API endpoint for getting all recent transactions for a specific customer
app.get("/api/transactionDates/:currentMonth/:currentBranch", (req, res) => {
  console.log("Months" + req.params.currentMonth);

  //MONTH function extracts the month from DateTime
  db.query(
    `SELECT * FROM transaction 
     WHERE MONTH(DateTime) = ? AND BranchName = ? AND AmountOfMaterialsGiven IS NOT NULL
     ORDER BY DateTime ASC`,
    [req.params.currentMonth, req.params.currentBranch],
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

// API endpoint for adding a NGO to the database
app.post("/api/ngo/add", (req, res) => {
  console.log(req.body);

  db.query(
    `INSERT INTO ngo (NGOName, Username) VALUES (?, ?)`,
    [req.body.ngoName, req.body.adminUsername],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
      }
    }
  );
});

// API endpoint for deleting a NGO from the database
app.post("/api/ngo/delete", (req, res) => {
  console.log(req.body.NGOToDelete.NGOName);

  db.query(
    `DELETE FROM ngo WHERE NGOName = ?`,
    [req.body.NGOToDelete.NGOName],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).end();
      } else if (results) {
        console.log(results);
      }
    }
  );
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

// API endpoint for getting all transaction in the database with current employee branch
app.get("/api/get_transaction/:username", (req, res) => {
  // console.log(req.params.username);

  db.query(
    `SELECT transaction.*
    FROM transaction, employee 
    WHERE employee.Username = ? AND transaction.BranchName = employee.BranchName
    `,
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

app.post("/api/updateEmpCred", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql =
    `Update ??
    SET  Username =?, LName = ?, FName = ?
    WHERE Username = ?`; //search employee query
  const placeHolder = [req.body.userType, req.body.employeesToDelete.username, req.body.employeesToDelete.lastname, req.body.employeesToDelete.firstname, req.body.employeesToDelete.original]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder); //insert the placeholders into the query

  console.log(query);
  console.log(typeof req.body.username);

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
    const sql = `DELETE
      FROM ?? 
      WHERE Username = ?`; //search employee query
    const placeHolder = [
      req.body.userType,
      `${req.body.employeesToDelete[i].Username}`,
    ]; //placeholders into '?' and '??' parameters
    const query = mysql.format(sql, placeHolder); //insert the placeholders into the query

    console.log(query);
    // console.log(typeof req.body.username)

    //Query to the database
    db.query(query, (error, results) => {
      if (results) {
        console.log(results);
      } else if (error) {
        console.log("Error " + error);
        res.status(500).end();
      }
    });
  }

  res.status(200).end();
});

app.post("/api/addEmpCred", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `INSERT INTO ??
      VALUES (?, ?, ?, ?, ?)`
  ); //search employee query
  const placeHolder = [
    req.body.userType,
    req.body.username,
    req.body.lastName,
    req.body.firstName,
    req.body.password,
    req.body.branchName

  ]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder); //insert the placeholders into the query

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

app.post("/api/selectCustWithName", (req, res) => {
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
  // console.log(typeof req.body.firstName + typeof req.body.lastName);

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


/**
 * Update Plastic
 */
app.post("/api/updatePlasticRate", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `Update ??
      SET MaterialRate = ?
      WHERE MaterialType = ?`
  );
  const placeHolder = [req.body.userType, req.body.pRate, req.body.plasticMat]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);

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

/**
 * Update GLASS
 */
app.post("/api/updateGlassRate", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `Update ??
      SET MaterialRate = ?
      WHERE MaterialType = ?`
  );
  const placeHolder = [req.body.userType, req.body.gRate, req.body.glassMat]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);

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

/**
 * Update Metal
 */
app.post("/api/updateMetalRate", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `Update ??
      SET MaterialRate = ?
      WHERE MaterialType = ?`
  );
  const placeHolder = [req.body.userType, req.body.mRate, req.body.metalMat]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);

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

/**
 * Update Paper
 */
app.post("/api/updatePaperRate", (req, res) => {
  console.log(req.body);

  /*Create query variable*/
  const sql = (
    `Update ??
      SET MaterialRate = ?
      WHERE MaterialType = ?`
  );
  const placeHolder = [req.body.userType, req.body.ppRate, req.body.paperMat]; //placeholders into '?' and '??' parameters
  const query = mysql.format(sql, placeHolder);//insert the placeholders into the query

  console.log(query);

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

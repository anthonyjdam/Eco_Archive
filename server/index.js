import express from "express";
import cors from "cors";
import mysql from 'mysql';

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

// const db = mysql.createConnection({
//   host: 'localhost',
//   port: '33061',
//   user: 'root',
//   password: 'password',
//   database: 'eco_archive'
// });

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
    console.log(req.body)
    
    // SELECT password FROM req.body.userType WHERE username = req.body.username

    // if (req.body.password ===        )   res.send("login success")
    // else res.send("login fail")

    res.send("login endpoint hit")
})


// Sign Up endpoint
app.post("/api/processSignup", (req, res) => {
    console.log(req.body)


    res.send("signup endpointhit")
})



app.listen(PORT, () => {
    console.log(`Serving running on port ${PORT}`)
});

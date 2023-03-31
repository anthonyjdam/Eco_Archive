import express from "express";
import cors from "cors";
import mysql from 'mysql';

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  port: '33061',
  user: 'root',
  password: 'password',
  database: 'eco_archive'
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

/*
 *   TODO: add the endpoints here
 */
app.listen(PORT);

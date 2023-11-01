import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Waste Management System'));
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors({ origin: ['http://127.0.0.1:5500'],
}));
// Create MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1979',
  database: 'ragpickers' // Change this to your desired database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + connection.threadId);
});

// Handle POST request to /register endpoint
app.post('/register', (req, res) => { 
  const { Name, Contact, areaOfOperation } = req.body;

  const insertQuery = 'INSERT INTO ragpickers (Name, Contact, area_of_operation) VALUES (?, ?, ?)';
  connection.query(insertQuery, [Name, Contact, areaOfOperation], (error, results, fields) => {
    if (error) {
      console.error('Error registering the rag picker: ' + error);
      res.status(500).send('Error registering the rag picker');
    } else {
      console.log('Rag picker registered successfully');
      res.status(200).send('Rag picker registered successfully');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

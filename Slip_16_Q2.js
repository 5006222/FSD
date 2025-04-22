const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB URI and database name
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'userRegistration';

// Create a MongoDB client
let db;
let userCollection;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    userCollection = db.collection('users');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Serve HTML form on the root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>User Registration</title></head>
      <body>
        <h1>User Registration Form</h1>
        <form action="/register" method="POST">
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" required><br><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" name="email" required><br><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password" required><br><br>
          <input type="submit" value="Register">
        </form>
      </body>
    </html>
  `);
});

// Handle the form submission
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Insert user data into MongoDB collection
    const result = await userCollection.insertOne({ name, email, password });
    
    // Display success message after inserting data
    res.send(`
      <html>
        <head><title>Registration Success</title></head>
        <body>
          <h1>Registration Successful!</h1>
          <p>Thank you for registering, ${name}!</p>
          <p>Your email is: ${email}</p>
          <p>Your password is securely stored in our database.</p>
          <a href="/">Go back to registration page</a>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Error registering user:', err);
    res.send('<h1>Error registering user. Please try again later.</h1>');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


/*
npm install express mongodb body-parser

*/
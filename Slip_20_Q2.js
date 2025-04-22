const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const uri = "mongodb://127.0.0.1:27017"; // MongoDB connection URL
const client = new MongoClient(uri);

// Connect to the MongoDB client
async function connectToDatabase() {
  await client.connect();
  console.log("Connected to MongoDB");
  return client.db("college"); // The database name is "college"
}

// Middleware to parse URL query parameters
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send("Welcome to the Student Management App");
});

// Create a student (using URL parameters)
app.get('/add', async (req, res) => {
  const { name, roll } = req.query;

  if (!name || !roll) {
    return res.send("Please provide both name and roll like ?name=John&roll=2");
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("students");

    const newStudent = { name, roll: parseInt(roll) };
    const result = await collection.insertOne(newStudent);

    res.send(`Student added with ID: ${result.insertedId}`);
  } catch (err) {
    res.send("Error adding student: " + err);
  }
});

// Update student by name (using URL parameters)
app.get('/update', async (req, res) => {
  const { name, roll } = req.query;

  if (!name || !roll) {
    return res.send("Please provide both name and roll like ?name=Snehal&roll=3");
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("students");

    const result = await collection.updateOne(
      { name: name }, // Find student by name
      { $set: { roll: parseInt(roll) } } // Update roll number
    );

    if (result.modifiedCount > 0) {
      res.send(`Student with name ${name} updated successfully.`);
    } else {
      res.send(`No student found with the name ${name}`);
    }
  } catch (err) {
    res.send("Error updating student: " + err);
  }
});

// Start the server
app.listen(6700, () => {
  console.log("Server running at http://localhost:6700");
});

/*

http://localhost:3000/add?name=John&roll=2

http://localhost:3000/update?name=Snehal&roll=3
*/
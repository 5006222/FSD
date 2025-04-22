const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB!");

    // Create college database
    const db = client.db("collegeDB");  // Creating the database (it will be created when we insert data)

    // Create students collection
    const collection = db.collection("students");

    // Insert sample student records
    const result = await collection.insertMany([
      { name: "John", age: 20, course: "Computer Science" },
      { name: "Emily", age: 22, course: "Mechanical Engineering" },
      { name: "Michael", age: 21, course: "Civil Engineering" }
    ]);

    console.log("Inserted Student Records:");
    console.log(result);

    // To check if the collection is created and data is inserted
    const students = await collection.find().toArray();
    console.log("\nStudents in College Database:");
    console.table(students);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();

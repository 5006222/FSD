const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("Teacher");

    // Select all records from the Teacher table
    const allRecords = await collection.find().toArray();
    console.log("All Teacher Records:");
    console.table(allRecords);

    // Find Teachers whose salary is greater than 20,000
    const highSalary = await collection.find({ salary: { $gt: 20000 } }).toArray();
    console.log("\nTeachers with Salary > 20000:");
    console.table(highSalary);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();


/*
use mydb

db.Teacher.insertMany([
  { name: "Sneha", subject: "English", salary: 23000 },
  { name: "Raj", subject: "Math", salary: 18000 },
  { name: "Anjali", subject: "Science", salary: 25000 }
]);


db.Teacher.find().pretty()



npm init -y
npm install mongodb

node Slip_2_Q2.js


*/
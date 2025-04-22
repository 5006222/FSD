const { MongoClient } = require("mongodb");

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("mydb"); // your database name
    const collection = db.collection("customer"); // collection name

    // Insert multiple customer records
    const result = await collection.insertMany([
      { name: "Alice", city: "New York", age: 28 },
      { name: "Bob", city: "Chicago", age: 32 },
      { name: "Charlie", city: "San Francisco", age: 25 }
    ]);

    // Show the result object in console
    console.log("Inserted Records Result:");
    console.log(result);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();

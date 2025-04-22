const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("MovieDB");
    const collection = db.collection("movies");

    const result = await collection.insertMany([
      { title: "Inception", director: "Christopher Nolan", year: 2010 },
      { title: "Interstellar", director: "Christopher Nolan", year: 2014 },
      { title: "The Dark Knight", director: "Christopher Nolan", year: 2008 }
    ]);

    console.log("Inserted Movie Records:");
    console.log(result);

    const movies = await collection.find().toArray();
    console.log("\nAll Movies in Database:");
    console.table(movies);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();

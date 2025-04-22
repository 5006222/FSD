const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";  // Your MongoDB URI
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const db = client.db("mydb");  // Replace with your database name
    const collection = db.collection("bank");  // Replace with your collection name

    // Select all records from the "bank" collection
    const allRecords = await collection.find().toArray();
    console.log("All Banks:");
    console.table(allRecords);

    // Delete a bank record by name (you can replace 'XYZ Bank' with the actual bank name you want to delete)
    const bankNameToDelete = "XYZ Bank";  // Replace with the bank name you want to delete
    const deleteResult = await collection.deleteOne({ name: bankNameToDelete });

    if (deleteResult.deletedCount === 1) {
      console.log(`Bank with name '${bankNameToDelete}' deleted successfully`);
    } else {
      console.log(`No bank found with the name '${bankNameToDelete}'`);
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

run();

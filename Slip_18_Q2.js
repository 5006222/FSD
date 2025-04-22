const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

// MongoDB URI
const url = 'mongodb://localhost:27017';
const dbName = 'productDB';

// Use bodyParser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch and display product details in an HTML table
app.get('/', async (req, res) => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('products');
    
    // Fetch all products from the "products" collection
    const products = await collection.find({}).toArray();
    
    let html = `
      <html>
        <head>
          <title>Product Details</title>
          <style>
            table {
              width: 80%;
              margin: 20px auto;
              border-collapse: collapse;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1 style="text-align:center;">Product Details</h1>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>`;

    // Append each product to the table
    products.forEach(product => {
      html += `
        <tr>
          <td>${product.product_id}</td>
          <td>${product.product_name}</td>
          <td>${product.category}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
        </tr>`;
    });

    html += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Send the HTML response
    res.send(html);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching product details');
  } finally {
    // Close MongoDB connection
    await client.close();
  }
});

// Start the Express server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

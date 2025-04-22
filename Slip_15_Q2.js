const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection URI
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

// Employee schema and model
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  position: String,
  salary: Number
});
const Employee = mongoose.model('Employee', employeeSchema);

// Sample data insertion (only run once if needed)
const insertSampleData = async () => {
  const count = await Employee.countDocuments();
  if (count === 0) {
    await Employee.insertMany([
      { name: 'John Doe', age: 30, position: 'Developer', salary: 60000 },
      { name: 'Jane Smith', age: 25, position: 'Designer', salary: 50000 },
      { name: 'David Brown', age: 40, position: 'Manager', salary: 80000 }
    ]);
    console.log("Sample data inserted.");
  }
};

// Insert sample data on startup
insertSampleData();

// Route to fetch and display employee details
app.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    let html = `
      <html>
        <head>
          <title>Employee Details</title>
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
          <h1 style="text-align:center;">Employee Details</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Position</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>`;

    // Append rows for each employee
    employees.forEach(employee => {
      html += `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.age}</td>
          <td>${employee.position}</td>
          <td>${employee.salary}</td>
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
    res.send('Error fetching employee details');
  }
});

// Start the Express server
app.listen(6700, () => {
  console.log('Server running on 6700 port');
});

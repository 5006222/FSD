const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bankDetails', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

const bankSchema = new mongoose.Schema({
  bank_no: String,
  bank_name: String,
  address: String,
  ifsc_code: String
});
const Bank = mongoose.model('Bank', bankSchema);

const insertSampleData = async () => {
  const count = await Bank.countDocuments();
  if (count === 0) {
    await Bank.insertMany([
      { bank_no: '001', bank_name: 'Bank of India', address: 'Mumbai', ifsc_code: 'BKID000001' },
      { bank_no: '002', bank_name: 'SBI', address: 'Delhi', ifsc_code: 'SBIN000002' },
      { bank_no: '003', bank_name: 'ICICI', address: 'Chennai', ifsc_code: 'ICIC000003' }
    ]);
    console.log("Sample data inserted.");
  }
};

insertSampleData();

app.get('/', async (req, res) => {
  try {
    const banks = await Bank.find();
    let html = `
      <html>
        <head>
          <title>Bank Details</title>
        </head>
        <body>
          <h1>Bank Details</h1>
          <table border="1">
            <tr>
              <th>Bank No</th>
              <th>Bank Name</th>
              <th>Address</th>
              <th>IFSC Code</th>
            </tr>`;

    banks.forEach(bank => {
      html += `
        <tr>
          <td>${bank.bank_no}</td>
          <td>${bank.bank_name}</td>
          <td>${bank.address}</td>
          <td>${bank.ifsc_code}</td>
        </tr>`;
    });

    html += `
          </table>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    res.send('Error fetching bank details');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/register', (req, res) => {
  res.send(`
    <h2>Student Registration</h2>
    <form method="POST" action="/register">
      Name: <input type="text" name="name"><br><br>
      Email: <input type="email" name="email"><br><br>
      <button type="submit">Register</button>
    </form>
  `);
});
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  res.send(`<h3>Registered successfully!</h3>Name: ${name}<br>Email: ${email}`);
});
app.listen(5000, () => {
  console.log('Visit http://localhost:5000/register');
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form method="post" action="/register">
            <label>Name:</label><br>
            <input type="text" name="name"><br>
            <label>Email:</label><br>
            <input type="text" name="email"><br>
            <label>Age:</label><br>
            <input type="number" name="age"><br>
            <button type="submit">Register</button>
        </form>
    `);
});

app.post('/register', (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.send("All fields are required!");
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send("Invalid email format!");
    }

    if (age <= 0) {
        return res.send("Age must be a positive number!");
    }

    res.send(`Employee Registered Successfully!<br>Name: ${name}<br>Email: ${email}<br>Age: ${age}`);
});

app.listen(8800, () => {
    console.log('Server is running on http://localhost:8800');
});


/*

npm init -y
npm install express body-parser

*/
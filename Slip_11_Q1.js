//module.js
function div(a, b) {
    return a / b;
}

function sub(a, b) {
    return a - b;
}

function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

module.exports = {div,sub,add,mul};


// addition.js

const http = require('http');
const module1 = require('./module'); 

http.createServer(function (req, resp) {

    resp.write("Addition: " + module1.add(10,20)+"\n");
     
    resp.write("Subtraction: " + module1.sub(10,20)+"\n"); 
    resp.write("Multiplication: " + module1.mul(10,20)+"\n"); 
    resp.write("Division: " + module1.div(10,20)+"\n"); 
    resp.end();
}).listen(3003);
    


////
/////////////
/////////////////////////
// math.js - Create a custom math module

module.exports = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        if (b !== 0) {
            return a / b;
        } else {
            return 'Error: Division by zero';
        }
    }
};







// server.js - Simple Web Server to use math module

const http = require('http');
const math = require('./math');  // Import the math module

const hostname = '127.0.0.1';
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    // Perform some math operations
    const num1 = 10;
    const num2 = 5;

    const addition = math.add(num1, num2);
    const subtraction = math.subtract(num1, num2);
    const multiplication = math.multiply(num1, num2);
    const division = math.divide(num1, num2);

    // Display results on the web page
    res.end(`
        <html>
            <head>
                <title>Math Operations</title>
            </head>
            <body>
                <h1>Arithmetic Operations Results</h1>
                <p>${num1} + ${num2} = ${addition}</p>
                <p>${num1} - ${num2} = ${subtraction}</p>
                <p>${num1} * ${num2} = ${multiplication}</p>
                <p>${num1} / ${num2} = ${division}</p>
            </body>
        </html>
    `);
});

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

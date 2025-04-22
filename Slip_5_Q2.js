// app.js
const http = require('http');
const { getCurrentDateTime } = require('./modules'); // Import the function from modules.js

// Create a server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Current Date and Time: ${getCurrentDateTime()}`); // Use the function from modules.js
});

// Start the server on port 3000
server.listen(3500, () => {
    console.log('Server is running at http://localhost:3500');
});


// modules.js
function getCurrentDateTime() {
    const currentDate = new Date();
    return currentDate.toLocaleString(); 
}

module.exports = {
    getCurrentDateTime
};

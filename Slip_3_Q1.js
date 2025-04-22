
const http = require('http');

http.createServer((req, res) => {
  res.end('This is your Node.js server');
}).listen(4000);

console.log("Server running at http://localhost:4000");

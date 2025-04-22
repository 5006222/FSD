const http = require('http');

const server = http.createServer((req, res) => {
  const str = "Full Stack!";
  const reversed = str.split('').reverse().join('');
  const upper = str.toUpperCase();
  const lower = str.toLowerCase();

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`Original String: ${str}\n`);
  res.write(`Reversed String: ${reversed}\n`);
  res.write(`Uppercase: ${upper}\n`);
  res.write(`Lowercase: ${lower}\n`);
  res.end();
}).listen(2222, () => {
  console.log('Server is running at http://localhost:2222');
});

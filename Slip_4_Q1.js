const http = require('http');
const querystring = require('querystring');

http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
      <form method="POST">
        <input type="text" name="str1" placeholder="First string" required />
        <input type="text" name="str2" placeholder="Second string" required />
        <button type="submit">Join</button>
      </form>
    `);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { str1, str2 } = querystring.parse(body);
     
      res.setHeader('Content-Type', 'text/html');
      res.end(`<p>Result: ${str1 + str2}</p><a href="/">Try again</a>`);
    });
  }
}).listen(2232, () => {
  console.log("Server is running on port 2232");
});

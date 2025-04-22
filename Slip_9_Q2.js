

// module.js

const reverseNumber = (num) => {
    return parseInt(num.toString().split('').reverse().join(''));
  };
  
  const isPalindrome = (num) => {
    return num === reverseNumber(num);
  };
  
    module.exports = { reverseNumber, isPalindrome };
  



// app.js

const http = require('http');
const url = require('url');
const { reverseNumber, isPalindrome } = require('./module');  // Importing the custom module

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const num = parseInt(query.number);

  res.writeHead(200, { 'Content-Type': 'text/html' });

  if (!num) {
    res.end(`
      <h2>Palindrome and Reverse Number Check</h2>
      <form method="get">
        Enter a number: <input type="text" name="number" />
        <button type="submit">Check</button>
      </form>
    `);
  } else {
    const reversed = reverseNumber(num);
    const palindrome = isPalindrome(num);

    res.end(`
      <h2>Number: ${num}</h2>
      <h3>Reversed: ${reversed}</h3>
      <h3>Palindrome: ${palindrome ? 'Yes' : 'No'}</h3>
      <a href="/">Try another</a>
    `);
  }
}).listen(3900, () => {
  console.log("Server is running at http://localhost:3900");
});

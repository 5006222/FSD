
const fs = require('fs');
const http = require('http');

// Create the web server
http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the HTML form when the page is accessed via GET
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
            <body>
                <h2>Append Content from File 1 to File 2</h2>
                <form action="/" method="POST">
                    <label for="file1">Enter the first file name:</label><br>
                    <input type="text" id="file1" name="file1"><br><br>
                    <label for="file2">Enter the second file name:</label><br>
                    <input type="text" id="file2" name="file2"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST') {
        // Handle the form submission
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const params = new URLSearchParams(body);
            const file1 = params.get('file1');
            const file2 = params.get('file2');

            // Read the first file and append it to the second file
            fs.readFile(file1, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h3>Error reading the first file!</h3>');
                    return;
                }

                fs.appendFile(file2, "\n" + data, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end('<h3>Error appending to the second file!</h3>');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(`<h3>Content of '${file1}' appended to '${file2}' successfully!</h3>`);
                    }
                });
            });
        });
    }
}).listen(1000, () => {
    console.log("Server is running on http://localhost:1000");
});
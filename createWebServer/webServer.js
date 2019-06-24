const http = require('http');
const hostname = require('os');
const port = 3000;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('Hello World');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
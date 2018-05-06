const http = require('http');

// this will be inside a Docker container, so use 0.0.0.0 instead of 127.0.0.1 loopback
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((request, response) => {
    request.statusCode = 200;
    response.end('Hello, World!');
});

server.listen(port, hostname, () => {console.log("Server started on port: " + port)});